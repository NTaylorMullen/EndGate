using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using EndGate.Core.Net.Interfaces;

namespace EndGate.Core.Net
{
    public class GameTime
    {
        private readonly DateTime _start;

        public GameTime()
        {
            _start = DateTime.UtcNow;
            Now = _start;
        }

        public TimeSpan Elapsed { get; private set; }
        public TimeSpan Total { get; private set; }
        public DateTime Now { get; private set; }

        public void Update()
        {
            var now = DateTime.UtcNow;

            Elapsed = now - Now;
            Total = now - _start;
            Now = now;
        }
    }
}
