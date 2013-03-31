using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;

namespace EndGate.Core.Utilities
{
    internal class Looper : IDisposable
    {
        private object _updateLock;
        private long _running;

        // Used to stop callback execution on callback additions or looper stops (within a Callback itself)
        private bool _callbacksModified;
        private List<LooperCallback> _callbacks;

        public Looper()
        {
            // Default values
            _updateLock = new object();
            _running = 0;
            _callbacksModified = false;
            _callbacks = new List<LooperCallback>();
        }

        public void AddCallback(LooperCallback callback)
        {
            lock (_updateLock)
            {
                _callbacks.Add(callback);
                _callbacksModified = true;
            }
        }

        public void RemoveCallback(LooperCallback callback)
        {
            lock (_updateLock)
            {
                _callbacks.Remove(callback);
                _callbacksModified = true;
            }
        }

        public void Start()
        {
            ThreadPool.QueueUserWorkItem(Run);
        }

        private void Run(object state)
        {
            var timer = Stopwatch.StartNew();
            long elapsedTime;

            if (Interlocked.Exchange(ref _running, 1) == 0)
            {
                while (true)
                {
                    // This will never have contention unless the user is setting the fps, callback or stopping the looper
                    lock (_updateLock)
                    {
                        // Verify we're still running
                        if (Interlocked.Read(ref _running) == 0)
                        {
                            break;
                        }

                        _callbacksModified = false;

                        foreach (LooperCallback callback in _callbacks)
                        {
                            elapsedTime = timer.ElapsedMilliseconds - callback.LastTriggered;

                            if (elapsedTime >= callback.TriggerFrequency)
                            {
                                callback.LastTriggered = timer.ElapsedMilliseconds;
                                callback.Callback();

                                // See if we modified 
                                if (_callbacksModified)
                                {
                                    break;
                                }
                            }
                        }
                    }

                    Thread.Yield();
                }
            }

            timer.Stop();
        }

        public void Dispose()
        {
            lock (_updateLock)
            {
                _callbacks.Clear();
                _callbacks = null;
                Interlocked.Exchange(ref _running, 0);
                _callbacksModified = true;
            }
        }
    }
}
