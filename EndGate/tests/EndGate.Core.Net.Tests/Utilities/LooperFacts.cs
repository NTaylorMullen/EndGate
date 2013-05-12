using System;
using System.Threading;
using EndGate.Core.Net.Loopers;
using Xunit;

namespace EndGate.Core.Net.Tests
{
    public class LooperFacts
    {
        [Fact]
        public void LooperSingleCallbackWorks()
        {
            long updates = 0;
            var resetEvent = new ManualResetEvent(false);
            var gameLoop = new Looper();
            var timedCallback = new TimedCallback(30, () =>
            {
                updates++;
                if (updates >= 30)
                {
                    resetEvent.Set();
                }
            });
            gameLoop.AddCallback(timedCallback);
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
            var timedCallback1 = new TimedCallback(30, () =>
            {
                updates++;
            });
            var timedCallback2 = new TimedCallback(60, () =>
            {
                updates--;

                if (updates <= -30)
                {
                    resetEvent.Set();
                }
            });

            gameLoop.AddCallback(timedCallback1);
            gameLoop.AddCallback(timedCallback2);
            gameLoop.Start();

            Assert.True(resetEvent.WaitOne(TimeSpan.FromSeconds(1.01)));
            gameLoop.Dispose();

            // Since timedCallback2 is executing twice as fast as timedCallback1 it will negate the value of updates
            Assert.Equal(updates, -30);
        }
    }
}
