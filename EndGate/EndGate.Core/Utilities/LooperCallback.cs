using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core.Utilities
{
    internal class LooperCallback
    {
        private int _fps;

        public LooperCallback()
        {
        }

        public LooperCallback(int fps, Action callback)
        {
            Fps = fps;
            Callback = callback;
        }

        public int TriggerFrequency { get; private set; }
        public long LastTriggered { get; set; }
        public Action Callback { get; set; }
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
