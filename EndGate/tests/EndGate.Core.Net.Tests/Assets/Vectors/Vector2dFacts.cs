using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Net.Assets;
using Xunit;

namespace EndGate.Core.Net.Tests
{
    public class Vector2dFacts
    {
        [Fact]
        public void Vector2DistanceWorks()
        {
            var v1 = new Vector2d(1, 1);
            var v2 = new Vector2d(13, 8);

            Assert.True(v1.Distance(v2).Equivalent(new Vector2d(12, 7)));
        }

        [Fact]
        public void Vector2dSignWorks()
        {
            var v = new Vector2d(3, -4);

            Assert.True(v.Sign().Equivalent(new Vector2d(1, -1)));
        }
        
        [Fact]
        public void Vector2dAbsWorks()
        {
            var v = new Vector2d(3, -4);

            Assert.True(v.Abs().Equivalent(new Vector2d(3, 4)));
        }

        [Fact]
        public void Vector2dDotProductWorks()
        {
            var v = new Vector2d(3, 4);
            var v2 = new Vector2d(8, 7);

            Assert.Equal(v.Dot(v2), 52);
        }

        [Fact]
        public void Vector2dMagnitudeWorks()
        {
            var v = new Vector2d(2, 2);
            double mag = v.Magnitude();

            Assert.Equal(2.83, Math.Round(mag, 2));
        }

        [Fact]
        public void Vector2dLengthWorks()
        {
            var v = new Vector2d(2, 2);
            double length = v.Length();

            Assert.Equal(2.83, Math.Round(length, 2));
        }

        [Fact]
        public void Vector2dNormalizedWorks()
        {
            var v = new Vector2d(12, 23);
            var v2 = v.Normalized();

            Assert.NotEqual(v, v2);
            Assert.True(v.Equivalent(new Vector2d(12, 23)));
            Assert.Equal(1, v.Normalized().Magnitude());
        }

        [Fact]
        public void Vector2dCloneWorks()
        {
            var v = new Vector2d(1, 2);
            var v2 = v.Clone();

            v2.X = 3;

            Assert.NotEqual(v, v2);
            Assert.False(v.Equivalent(v2));
            Assert.True(v.Equivalent(new Vector2d(1, 2)));
        }

        [Fact]
        public void Vector2dTriggerWorks()
        {
            var v = new Vector2d(2, 3);
            double total = 0;
            Action<double> sum = (val) =>
            {
                total += val;
            };

            v.Trigger(sum);

            Assert.Equal(5, total);
        }

        [Fact]
        public void Vector2dApplyWorks()
        {
            var v = new Vector2d(1.11, 2.22);

            v.Apply(Math.Round);

            Assert.True(v.Equivalent(new Vector2d(1, 2)));

            v.Apply(val => { return val + 1; });

            Assert.True(v.Equivalent(new Vector2d(2, 3)));
        }

        [Fact]
        public void RotateAroundWorks()
        {
            var v1 = Vector2d.Zero;

            // Flip
            var rotated = v1.RotateAround(Vector2d.One, Math.PI);

            Assert.NotEqual(v1, rotated);
            Assert.False(v1.Equivalent(rotated));            
            Assert.True(rotated.Equivalent(new Vector2d(2, 2)));
        }

        [Fact]
        public void ProjectOntoWorks()
        {
            var v = new Vector2d(3, 7);
            var axis = new Vector2d(8, 0);

            var projection = v.ProjectOnto(axis);

            Assert.True(projection.Equivalent(new Vector2d(3, 0)));
        }

        [Fact]
        public void Vector2dAddsCorrectly()
        {
            var v = new Vector2d(2, 3);

            Assert.False(v == v + 0);
            Assert.False(v == v.Add(0));
            Assert.True(v.Equivalent(v+0));
            Assert.True(v.Equivalent(v.Add(0)));
            Assert.True((v + v).Equivalent(new Vector2d(4, 6)));
            Assert.True(v.Add(v).Equivalent(new Vector2d(4, 6)));
            Assert.True((v + .1).Equivalent(new Vector2d(2.1, 3.1)));
            Assert.True(v.Add(.1).Equivalent(new Vector2d(2.1, 3.1)));
        }

        [Fact]
        public void Vector2dSubtractsCorrectly()
        {
            var v = new Vector2d(2, 3);

            Assert.False(v == v - 0);
            Assert.False(v == v.Subtract(0));
            Assert.False(-v == v.SubtractFrom(0));
            Assert.True(v.Equivalent(v - 0));
            Assert.True(v.Equivalent(v.Subtract(0)));
            Assert.True((-v).Equivalent(0- v));
            Assert.True((-v).Equivalent(v.SubtractFrom(0)));
            Assert.True((v - v).Equivalent(Vector2d.Zero));
            Assert.True((v.Subtract(v)).Equivalent(Vector2d.Zero));
            Assert.True((v - .1).Equivalent(new Vector2d(1.9, 2.9)));
            Assert.True((v.Subtract(.1)).Equivalent(new Vector2d(1.9, 2.9)));
            Assert.True((.1 - v).Equivalent(new Vector2d(-1.9, -2.9)));
            Assert.True((v.SubtractFrom(.1)).Equivalent(new Vector2d(-1.9, -2.9)));
        }

        [Fact]
        public void Vector2dMultipliesCorrectly()
        {
            var v = new Vector2d(2, 3);

            Assert.False(Vector2d.Zero == v * 0);
            Assert.False(Vector2d.Zero == v.Multiply(0));
            Assert.True(Vector2d.Zero.Equivalent(v * 0));
            Assert.True(Vector2d.Zero.Equivalent(v.Multiply(0)));
            Assert.True((v * v).Equivalent(new Vector2d(4, 9)));
            Assert.True(v.Multiply(v).Equivalent(new Vector2d(4, 9)));
            Assert.True((v * .5).Equivalent(new Vector2d(1, 1.5)));
            Assert.True(v.Multiply(.5).Equivalent(new Vector2d(1, 1.5)));
        }

        [Fact]
        public void Vector2dDividesCorrectly()
        {
            var v = new Vector2d(2, 4);

            Assert.False(v == v / 1);
            Assert.False(v == v.Divide(1));
            Assert.True(v.Equivalent(v / 1));
            Assert.True(v.Equivalent(v.Divide(1)));
            Assert.True(new Vector2d(.5, .25).Equivalent(1 / v));
            Assert.True(new Vector2d(.5, .25).Equivalent(v.DivideFrom(1)));
            Assert.True(new Vector2d(20, 40).Equivalent(v / .1));
            Assert.True(new Vector2d(20, 40).Equivalent(v.Divide(.1)));
        }
    }
}
