using System;
using System.Threading;
using Xunit;

namespace EndGate.Core.Net.Tests
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
            UpdateTester game1 = null,
                         game2 = null;

            bool triggered1 = false,
                 triggered2 = false;

            game1 = new UpdateTester(60, () =>
            {
                triggered1 = true;
                game1.Dispose();
            }, 60);

            game2 = new UpdateTester(40, () =>
            {
                triggered2 = true;
                game2.Dispose();
            }, 40);

            Thread.Sleep(TimeSpan.FromSeconds(1.01));

            Assert.True(triggered1);
            Assert.True(triggered2);
            Assert.Equal(game1.UpdateCount, 60);
            Assert.Equal(game2.UpdateCount, 40);
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
