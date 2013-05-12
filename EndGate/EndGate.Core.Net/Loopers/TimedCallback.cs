using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core.Net.Loopers
{
    internal class TimedCallback : LooperCallback
    {
        private int _fps;

        public TimedCallback()
        {
        }

        public TimedCallback(int fps, Action callback) :
            base(callback)
        {
            Fps = fps;
        }

        public int TriggerFrequency { get; private set; }
        public long LastTriggered { get; set; }
        public int Fps
        {
            get
            {
                return _fps;
            }
            set
            {
                _fps = value;

                TriggerFrequency = (_fps != 0) ? 1000 / _fps : 0;
            }
        }
    }
}
