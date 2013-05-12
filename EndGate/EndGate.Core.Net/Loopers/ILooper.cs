using System;

namespace EndGate.Core.Net.Loopers
{
    internal interface ILooper : IDisposable
    {
        void Start();
        void AddCallback(TimedCallback callback);
        void RemoveCallback(TimedCallback callback);
    }
}
