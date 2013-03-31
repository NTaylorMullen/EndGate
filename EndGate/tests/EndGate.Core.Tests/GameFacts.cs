using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace EndGate.Core.Tests
{
    public class GameFacts
    {
        [Fact]
        public void ClassesInheritingGameHaveUpdateCalled()
        {
            UpdateTester game1 = null;
            var resetEvent = new ManualResetEvent(false);
            
            game1 = new UpdateTester(() =>
            {
                resetEvent.Set();
                game1.Dispose();
            }, 40);

            Assert.True(resetEvent.WaitOne(TimeSpan.FromSeconds(1.01)));

            // 40 is the default updates/second
            Assert.Equal(game1.UpdateCount, 40);
        }

        [Fact]
        public void ClassesInheritingGameAreRunIndividually()
        {
            UpdateTester game1 = null;
            var resetEvent = new ManualResetEvent(false);

            game1 = new UpdateTester(60,() =>
            {
                resetEvent.Set();
                game1.Dispose();
            }, 60);

            Assert.True(resetEvent.WaitOne(TimeSpan.FromSeconds(1.01)));

            Assert.Equal(game1.UpdateCount, 60);
        }
    }

    public class UpdateTester : Game
    {
        private Action _onUpdateLimit;
        private int _updateLimit;

        public int UpdateCount { get; set; }

        public UpdateTester(Action onUpdateLimit, int updateLimit)
            : this(40, onUpdateLimit, updateLimit)
        {
        }

        public UpdateTester(int updateRate, Action onUpdateLimit, int updateLimit)
        {
            Configuration.UpdateRate = updateRate;
            _onUpdateLimit = onUpdateLimit;
            _updateLimit = updateLimit;
        }

        public override void Update(GameTime gameTime)
        {
            UpdateCount++;

            if (UpdateCount == _updateLimit)
            {
                _onUpdateLimit();
            }

            base.Update(gameTime);
        }
    }
}
