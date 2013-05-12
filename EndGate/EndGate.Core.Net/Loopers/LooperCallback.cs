using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core.Net.Loopers
{
    internal class LooperCallback
    {
        public LooperCallback()
        {
        }

        public LooperCallback(Action callback)
        {
            Callback = callback;
        }

        public Action Callback { get; set; }        
    }
}
