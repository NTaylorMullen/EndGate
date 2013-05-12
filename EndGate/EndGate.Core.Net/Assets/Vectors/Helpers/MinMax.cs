using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core.Net.Assets
{
    public class MinMax
    {
        public MinMax(Number min, Number max)
        {
            Min = min;
            Max = max;
        }

        public Number Min { get; set; }
        public Number Max { get; set; }
    }
}
