using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace EndGate.Core.Tests
{
    public class Vector2Facts
    {
        [Fact]
        public void Vector2AbsWorks()
        {
            var v = new Vector2(3, -4);

            Assert.True(v.Abs().Equivalent(new Vector2(3, 4)));
        }

        public void Vector2SignWorks()
        {
            var v = new Vector2(3, -4);

            Assert.True(v.Sign().Equivalent(new Vector2(1, -1)));
        }

        [Fact]
        public void Vector2ApplyWorks()
        {
            var v = new Vector2(1.11, 2.22);

            v.Apply(Math.Round);

            Assert.True(v.Equivalent(new Vector2(1, 2)));

            v.Apply(val => { return val + 1; });

            Assert.True(v.Equivalent(new Vector2(2, 3)));
        }

        [Fact]
        public void Vector2TriggerWorks()
        {
            var v = new Vector2(2, 3);
            double total = 0;
            Action<double> sum = (val) =>
            {
                total += val;
            };

            v.Trigger(sum);

            Assert.Equal(5, total);
        }

        [Fact]
        public void Vector2CloneWorks()
        {
            var v = new Vector2(1, 2);
            var v2 = v.Clone();

            v2.X = 3;

            Assert.NotEqual(v, v2);
            Assert.True(v.Equivalent(new Vector2(1, 2)));
        }

        [Fact]
        public void Vector2NormalizedWorks()
        {
            var v = new Vector2(12, 23);
            var v2 = v.Normalized();

            Assert.NotEqual(v, v2);
            Assert.True(v.Equivalent(new Vector2(12, 23)));
            Assert.Equal(1, v.Normalized().Magnitude());
        }

        [Fact]
        public void Vector2MagnitudeWorks()
        {
            var v = new Vector2(2, 2);
            double mag = v.Magnitude();

            Assert.Equal(2.83, Math.Round(mag,2));
        }

        [Fact]
        public void Vector2LengthWorks()
        {
            var v = new Vector2(2, 2);
            double length = v.Length();

            Assert.Equal(2.83, Math.Round(length, 2));
        }

        [Fact]
        public void Vector2DotProductWorks()
        {
            var v = new Vector2(3, 4);
            var v2 = new Vector2(8, 7);

            Assert.Equal(v.Dot(v2), 52);
        }

        [Fact]
        public void Vector2AddsCorrectly()
        {
            var v = new Vector2(2, 3);

            Assert.False(v == v + 0);
            Assert.False(v == v.Add(0));
            Assert.True(v.Equivalent(v+0));
            Assert.True(v.Equivalent(v.Add(0)));
            Assert.True((v + v).Equivalent(new Vector2(4, 6)));
            Assert.True(v.Add(v).Equivalent(new Vector2(4, 6)));
            Assert.True((v + .1).Equivalent(new Vector2(2.1, 3.1)));
            Assert.True(v.Add(.1).Equivalent(new Vector2(2.1, 3.1)));
        }

        [Fact]
        public void Vector2SubtractsCorrectly()
        {
            var v = new Vector2(2, 3);

            Assert.False(v == v - 0);
            Assert.False(v == v.Subtract(0));
            Assert.False(-v == v.SubtractFrom(0));
            Assert.True(v.Equivalent(v - 0));
            Assert.True(v.Equivalent(v.Subtract(0)));
            Assert.True((-v).Equivalent(0- v));
            Assert.True((-v).Equivalent(v.SubtractFrom(0)));
            Assert.True((v - v).Equivalent(Vector2.Zero));
            Assert.True((v.Subtract(v)).Equivalent(Vector2.Zero));
            Assert.True((v - .1).Equivalent(new Vector2(1.9, 2.9)));
            Assert.True((v.Subtract(.1)).Equivalent(new Vector2(1.9, 2.9)));
            Assert.True((.1 - v).Equivalent(new Vector2(-1.9, -2.9)));
            Assert.True((v.SubtractFrom(.1)).Equivalent(new Vector2(-1.9, -2.9)));
        }

        [Fact]
        public void Vector2MultipliesCorrectly()
        {
            var v = new Vector2(2, 3);

            Assert.False(Vector2.Zero == v * 0);
            Assert.False(Vector2.Zero == v.Multiply(0));
            Assert.True(Vector2.Zero.Equivalent(v * 0));
            Assert.True(Vector2.Zero.Equivalent(v.Multiply(0)));
            Assert.True((v * v).Equivalent(new Vector2(4, 9)));
            Assert.True(v.Multiply(v).Equivalent(new Vector2(4, 9)));
            Assert.True((v * .5).Equivalent(new Vector2(1, 1.5)));
            Assert.True(v.Multiply(.5).Equivalent(new Vector2(1, 1.5)));
        }

        [Fact]
        public void Vector2DividesCorrectly()
        {
            var v = new Vector2(2, 4);

            Assert.False(v == v / 1);
            Assert.False(v == v.Divide(1));
            Assert.True(v.Equivalent(v / 1));
            Assert.True(v.Equivalent(v.Divide(1)));
            Assert.True(new Vector2(.5, .25).Equivalent(1 / v));
            Assert.True(new Vector2(.5, .25).Equivalent(v.DivideFrom(1)));
            Assert.True(new Vector2(20, 40).Equivalent(v / .1));
            Assert.True(new Vector2(20, 40).Equivalent(v.Divide(.1)));
        }
    }
}
