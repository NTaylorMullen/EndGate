using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EndGate.Core.Utilities;
using Xunit;

namespace EndGate.Core.Tests
{
    public class LooperFacts
    {
        [Fact]
        public void LooperSingleCallbackWorks()
        {
            long updates = 0;
            var resetEvent = new ManualResetEvent(false);
            var gameLoop = new Looper();
            var looperCallback = new LooperCallback(30, () =>
            {
                updates++;
                if (updates >= 30)
                {
                    resetEvent.Set();
                }
            });
            gameLoop.AddCallback(looperCallback);
            gameLoop.Start();

            Assert.True(resetEvent.WaitOne(TimeSpan.FromSeconds(1.01)));
            gameLoop.Dispose();

            Assert.Equal(updates, 30);
        }

        [Fact]
        public void LooperMultipleCallbacksWork()
        {
            long updates = 0;
            var resetEvent = new ManualResetEvent(false);
            var gameLoop = new Looper();
            var looperCallback1 = new LooperCallback(30, () =>
            {
                updates++;
            });
            var looperCallback2 = new LooperCallback(60, () =>
            {
                updates--;

                if (updates <= -30)
                {
                    resetEvent.Set();
                }
            }); 
            
            gameLoop.AddCallback(looperCallback1);
            gameLoop.AddCallback(looperCallback2);
            gameLoop.Start();

            Assert.True(resetEvent.WaitOne(TimeSpan.FromSeconds(1.01)));
            gameLoop.Dispose();

            // Since looperCallback2 is executing twice as fast as looperCallback1 it will negate the value of updates
            Assert.Equal(updates, -30);
        }
    }
}
