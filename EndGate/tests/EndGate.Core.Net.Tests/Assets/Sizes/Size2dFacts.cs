using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Net.Assets;
using Xunit;

namespace EndGate.Core.Net.Tests
{
    public class Size2dFacts
    {   
        [Fact]
        public void Size2dApplyWorks()
        {
            var v = new Size2d(1.11, 2.22);

            v.Apply(Math.Round);

            Assert.True(v.Equivalent(new Size2d(1, 2)));

            v.Apply(val => { return val + 1; });

            Assert.True(v.Equivalent(new Size2d(2, 3)));
        }

        [Fact]
        public void Size2dTriggerWorks()
        {
            var v = new Size2d(2, 3);
            double total = 0;
            Action<double> sum = (val) =>
            {
                total += val;
            };

            v.Trigger(sum);

            Assert.Equal(5, total);
        }

        [Fact]
        public void Size2dCloneWorks()
        {
            var v = new Size2d(1, 2);
            var v2 = v.Clone();

            v2.Width = 3;

            Assert.NotEqual(v, v2);
            Assert.True(v.Equivalent(new Size2d(1, 2)));
        }

        [Fact]
        public void Size2dAddsCorrectly()
        {
            var v = new Size2d(2, 3);

            Assert.False(v == v + 0);
            Assert.False(v == v.Add(0));
            Assert.True(v.Equivalent(v + 0));
            Assert.True(v.Equivalent(v.Add(0)));
            Assert.True((v + v).Equivalent(new Size2d(4, 6)));
            Assert.True(v.Add(v).Equivalent(new Size2d(4, 6)));
            Assert.True((v + .1).Equivalent(new Size2d(2.1, 3.1)));
            Assert.True(v.Add(.1).Equivalent(new Size2d(2.1, 3.1)));
        }

        [Fact]
        public void Size2dSubtractsCorrectly()
        {
            var v = new Size2d(2, 3);

            Assert.False(v == v - 0);
            Assert.False(v == v.Subtract(0));
            Assert.False(-v == v.SubtractFrom(0));
            Assert.True(v.Equivalent(v - 0));
            Assert.True(v.Equivalent(v.Subtract(0)));
            Assert.True((-v).Equivalent(0 - v));
            Assert.True((-v).Equivalent(v.SubtractFrom(0)));
            Assert.True((v - v).Equivalent(Size2d.Zero));
            Assert.True((v.Subtract(v)).Equivalent(Size2d.Zero));
            Assert.True((v - .1).Equivalent(new Size2d(1.9, 2.9)));
            Assert.True((v.Subtract(.1)).Equivalent(new Size2d(1.9, 2.9)));
            Assert.True((.1 - v).Equivalent(new Size2d(-1.9, -2.9)));
            Assert.True((v.SubtractFrom(.1)).Equivalent(new Size2d(-1.9, -2.9)));
        }

        [Fact]
        public void Size2dMultipliesCorrectly()
        {
            var v = new Size2d(2, 3);

            Assert.False(Size2d.Zero == v * 0);
            Assert.False(Size2d.Zero == v.Multiply(0));
            Assert.True(Size2d.Zero.Equivalent(v * 0));
            Assert.True(Size2d.Zero.Equivalent(v.Multiply(0)));
            Assert.True((v * v).Equivalent(new Size2d(4, 9)));
            Assert.True(v.Multiply(v).Equivalent(new Size2d(4, 9)));
            Assert.True((v * .5).Equivalent(new Size2d(1, 1.5)));
            Assert.True(v.Multiply(.5).Equivalent(new Size2d(1, 1.5)));
        }

        [Fact]
        public void Size2dDividesCorrectly()
        {
            var v = new Size2d(2, 4);

            Assert.False(v == v / 1);
            Assert.False(v == v.Divide(1));
            Assert.True(v.Equivalent(v / 1));
            Assert.True(v.Equivalent(v.Divide(1)));
            Assert.True(new Size2d(.5, .25).Equivalent(1 / v));
            Assert.True(new Size2d(.5, .25).Equivalent(v.DivideFrom(1)));
            Assert.True(new Size2d(20, 40).Equivalent(v / .1));
            Assert.True(new Size2d(20, 40).Equivalent(v.Divide(.1)));
        }
    }
}
