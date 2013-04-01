using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;
using EndGate.Core.BoundingObject;
using Xunit;

namespace EndGate.Core.Tests
{
    public class BoundingCircleFacts
    {
        [Fact]
        public void AreaWorks()
        {
            var obj = new BoundingCircle(10);

            Assert.Equal(Math.Round(obj.Area()), 314);
        }

        [Fact]
        public void CircumfrenceWorks()
        {
            var obj = new BoundingCircle(10);

            Assert.Equal(Math.Round(obj.Circumfrence()), 63);
        }

        [Fact]
        public void IsCollidingWithOtherCircleWorks()
        {
            var circle1 = new BoundingCircle(10)
            {
                Position = new Vector2d(10,5)
            };

            var circle2 = new BoundingCircle(6)
            {
                Position = new Vector2d(17, 5)
            };

            Assert.True(circle1.IsCollidingWith(circle2));

            circle2.Position.X = -5;

            Assert.True(circle1.IsCollidingWith(circle2));

            circle2.Position.X = -6;

            Assert.False(circle1.IsCollidingWith(circle2));
        }

        [Fact]
        public void IsCollidingWithRectangleWorks()
        {
            var rect = new BoundingRectangle(10, 6)
            {
                Position = new Vector2d(5, 3)
            };

            var circle = new BoundingCircle(3)
            {
                Position = new Vector2d(13, 3)
            };

            Assert.False(circle.IsCollidingWith(rect));
            circle.Position.X--;
            Assert.True(circle.IsCollidingWith(rect));
            rect.Rotation = Math.PI * .5;
            rect.Position.X = 3;
            rect.Position.Y = 5;

            circle.Position.X = 8;
            circle.Position.Y = 12;

            Assert.True(circle.IsCollidingWith(rect));

        }

        [Fact]
        public void ContainsPointWorks()
        {
            var circle = new BoundingCircle(10)
            {
                Position = new Vector2d(10, 5)
            };

            Assert.False(circle.ContainsPoint(Vector2d.Zero));
            Assert.True(circle.ContainsPoint(new Vector2d(3, 3)));
        }
    }
}
