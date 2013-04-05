using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;
using Xunit;

namespace EndGate.Core.Tests.Assets.Vectors
{
    public class Vector2dHelperFacts
    {
        [Fact]
        public void GetMinMaxProjectionsWorks()
        {
            var axis = new Vector2d(8, 0);
            var vertices = new Vector2d[] {
                new Vector2d(2, 0),  // TL
                new Vector2d(5, 3),  // TR
                new Vector2d(0, -2), // BL
                new Vector2d(3, 5)   // BR
            };

            double expectedMax = vertices[1].ProjectOnto(axis).Dot(axis);
            double expectedMin = vertices[2].ProjectOnto(axis).Dot(axis);

            Tuple<double, double> maxmin = Vector2dHelpers.GetMinMaxProjections(axis, vertices);

            Assert.Equal(maxmin.Item1, expectedMin);
            Assert.Equal(maxmin.Item2, expectedMax);
        }
    }
}
