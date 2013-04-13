using System;

namespace EndGate.Core.Loopers
{
    internal interface ILooper : IDisposable
    {
        void Start();
        void AddCallback(TimedCallback callback);
        void RemoveCallback(TimedCallback callback);
    }
}
