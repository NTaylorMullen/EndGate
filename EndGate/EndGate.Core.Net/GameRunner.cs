using System;
using System.Collections.Concurrent;
using EndGate.Core.Net.Loopers;

namespace EndGate.Core.Net
{
    internal class GameRunner
    {
        private static Lazy<GameRunner> _instance = new Lazy<GameRunner>(() => new GameRunner());
        private ConcurrentDictionary<long, TimedCallback> _callbacks;
        private Looper _updateLoop;

        public GameRunner()
        {
            _callbacks = new ConcurrentDictionary<long, TimedCallback>();
        }

        public static GameRunner Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public Action<int> Register(Game game)
        {
            var updateCallback = CreateAndCacheCallback(game);

            // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
            TryLoopStart();

            // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
            _updateLoop.AddCallback(updateCallback);

            // Updating the "updateRate" is an essential element to the game configuration.
            // If a game is running slowly we need to be able to slow down the update rate.
            return CreateUpdateRateSetter(updateCallback);
        }

        public void Unregister(Game game)
        {
            TimedCallback updateCallback;
            _callbacks.TryRemove(game.ID, out updateCallback);
            _updateLoop.RemoveCallback(updateCallback);

            TryLoopStop();
        }

        private void TryLoopStart()
        {
            if (_callbacks.Count == 1)
            {
                _updateLoop = new Looper();
                _updateLoop.Start();
            }
        }

        private void TryLoopStop()
        {
            if (_callbacks.Count == 0 && _updateLoop != null)
            {
                _updateLoop.Dispose();
                _updateLoop = null;
            }
        }

        private TimedCallback CreateAndCacheCallback(Game game)
        {
            var updateCallback = new TimedCallback
            {
                Callback = game.PrepareUpdate
            };

            // Add the callback to the callback cache
            _callbacks.TryAdd(game.ID, updateCallback);

            return updateCallback;
        }

        private Action<int> CreateUpdateRateSetter(TimedCallback callback)
        {
            return (updateRate) =>
            {
                callback.Fps = updateRate;
            };
        }
    }
}
