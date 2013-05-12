using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Net.Assets;
using Xunit;

namespace EndGate.Core.Net.Tests
{
    public class Vector3dFacts
    {
        [Fact]
        public void Vector3dAbsWorks()
        {
            var v = new Vector3d(3, -4, -5);

            Assert.True(v.Abs().Equivalent(new Vector3d(3, 4, 5)));
        }

        public void Vector3dSignWorks()
        {
            var v = new Vector3d(3, -4, -5);

            Assert.True(v.Sign().Equivalent(new Vector3d(1, -1, -1)));
        }

        [Fact]
        public void Vector3dApplyWorks()
        {
            var v = new Vector3d(1.11, 2.22, 3.33);

            v.Apply(Math.Round);

            Assert.True(v.Equivalent(new Vector3d(1, 2, 3)));

            v.Apply(val => { return val + 1; });

            Assert.True(v.Equivalent(new Vector3d(2, 3, 4)));
        }

        [Fact]
        public void Vector3dTriggerWorks()
        {
            var v = new Vector3d(2, 3, 4);
            double total = 0;
            Action<double> sum = (val) =>
            {
                total += val;
            };

            v.Trigger(sum);

            Assert.Equal(9, total);
        }

        [Fact]
        public void Vector3dCloneWorks()
        {
            var v = new Vector3d(1, 2, 3);
            var v2 = v.Clone();

            v2.X = 3;

            Assert.NotEqual(v, v2);
            Assert.True(v.Equivalent(new Vector3d(1, 2, 3)));
        }

        [Fact]
        public void Vector3dNormalizedWorks()
        {
            var v = new Vector3d(12, 23, 34);
            var v2 = v.Normalized();

            Assert.NotEqual(v, v2);
            Assert.True(v.Equivalent(new Vector3d(12, 23, 34)));
            Assert.Equal(1, v.Normalized().Magnitude());
        }

        [Fact]
        public void Vector3dMagnitudeWorks()
        {
            var v = new Vector3d(2, 2, 2);
            double mag = v.Magnitude();

            Assert.Equal(3.46, Math.Round(mag, 2));
        }

        [Fact]
        public void Vector3dLengthWorks()
        {
            var v = new Vector3d(2, 2, 2);
            double length = v.Length();

            Assert.Equal(3.46, Math.Round(length, 2));
        }

        [Fact]
        public void Vector3dDotProductWorks()
        {
            var v = new Vector3d(3, 4, 5);
            var v2 = new Vector3d(8, 7, 6);

            Assert.Equal(v.Dot(v2), 82);
        }

        [Fact]
        public void Vector3dAddsCorrectly()
        {
            var v = new Vector3d(2, 3, 4);

            Assert.False(v == v + 0);
            Assert.False(v == v.Add(0));
            Assert.True(v.Equivalent(v + 0));
            Assert.True(v.Equivalent(v.Add(0)));
            Assert.True((v + v).Equivalent(new Vector3d(4, 6, 8)));
            Assert.True(v.Add(v).Equivalent(new Vector3d(4, 6, 8)));
            Assert.True((v + .1).Equivalent(new Vector3d(2.1, 3.1, 4.1)));
            Assert.True(v.Add(.1).Equivalent(new Vector3d(2.1, 3.1, 4.1)));
        }

        [Fact]
        public void Vector3dSubtractsCorrectly()
        {
            var v = new Vector3d(2, 3, 4);

            Assert.False(v == v - 0);
            Assert.False(v == v.Subtract(0));
            Assert.False(-v == v.SubtractFrom(0));
            Assert.True(v.Equivalent(v - 0));
            Assert.True(v.Equivalent(v.Subtract(0)));
            Assert.True((-v).Equivalent(0 - v));
            Assert.True((-v).Equivalent(v.SubtractFrom(0)));
            Assert.True((v - v).Equivalent(Vector3d.Zero));
            Assert.True((v.Subtract(v)).Equivalent(Vector3d.Zero));
            Assert.True((v - .1).Equivalent(new Vector3d(1.9, 2.9, 3.9)));
            Assert.True((v.Subtract(.1)).Equivalent(new Vector3d(1.9, 2.9, 3.9)));
            Assert.True((.1 - v).Equivalent(new Vector3d(-1.9, -2.9, -3.9)));
            Assert.True((v.SubtractFrom(.1)).Equivalent(new Vector3d(-1.9, -2.9, -3.9)));
        }

        [Fact]
        public void Vector3dMultipliesCorrectly()
        {
            var v = new Vector3d(2, 3, 4);

            Assert.False(Vector3d.Zero == v * 0);
            Assert.False(Vector3d.Zero == v.Multiply(0));
            Assert.True(Vector3d.Zero.Equivalent(v * 0));
            Assert.True(Vector3d.Zero.Equivalent(v.Multiply(0)));
            Assert.True((v * v).Equivalent(new Vector3d(4, 9, 16)));
            Assert.True(v.Multiply(v).Equivalent(new Vector3d(4, 9, 16)));
            Assert.True((v * .5).Equivalent(new Vector3d(1, 1.5, 2)));
            Assert.True(v.Multiply(.5).Equivalent(new Vector3d(1, 1.5, 2)));
        }

        [Fact]
        public void Vector3dDividesCorrectly()
        {
            var v = new Vector3d(2, 4, 8);

            Assert.False(v == v / 1);
            Assert.False(v == v.Divide(1));
            Assert.True(v.Equivalent(v / 1));
            Assert.True(v.Equivalent(v.Divide(1)));
            Assert.True(new Vector3d(.5, .25, .125).Equivalent(1 / v));
            Assert.True(new Vector3d(.5, .25, .125).Equivalent(v.DivideFrom(1)));
            Assert.True(new Vector3d(20, 40, 80).Equivalent(v / .1));
            Assert.True(new Vector3d(20, 40, 80).Equivalent(v.Divide(.1)));
        }
    }
}
