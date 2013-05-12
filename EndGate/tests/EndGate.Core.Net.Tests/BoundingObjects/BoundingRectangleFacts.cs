using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Net.Assets;
using EndGate.Core.Net.BoundingObject;
using Xunit;

namespace EndGate.Core.Net.Tests
{
    public class BoundingRectangleFacts
    {
        [Fact]
        public void UnrotatedRectangleCornersGetWorks()
        {
            var rect = new BoundingRectangle(6, 6)
            {
                Position = new Vector2d(3, 3)
            };

            Assert.True(rect.TopLeft.Equivalent(Vector2d.Zero));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(6, 0)));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(0, 6)));
            Assert.True(rect.BotRight.Equivalent(new Vector2d(6, 6)));

            rect.Position -= 6;
            Assert.True(rect.TopLeft.Equivalent(new Vector2d(-6, -6)));
            Assert.True(rect.TopRight.Equivalent(new Vector2d(0, -6)));
            Assert.True(rect.BotLeft.Equivalent(new Vector2d(-6, 0)));
            Assert.True(rect.BotRight.Equivalent(Vector2d.Zero));
        }

        [Fact]
        public void RotatedRectangleCornersGetWorks()
        {
            var rect = new BoundingRectangle(4, 2)
            {
                Position = new Vector2d(3, 2),
                Rotation = -Math.PI / 2
            };

            var topLeft = rect.TopLeft.Clone();
            var topRight = rect.TopRight.Clone();
            var botLeft = rect.BotLeft.Clone();
            var botRight = rect.BotRight.Clone();

            topLeft.Apply(Math.Round);
            topRight.Apply(Math.Round);
            botLeft.Apply(Math.Round);
            botRight.Apply(Math.Round);

            Assert.True(topLeft.Equivalent(new Vector2d(2, 4)));
            Assert.True(topRight.Equivalent(new Vector2d(2, 0)));
            Assert.True(botLeft.Equivalent(new Vector2d(4, 4)));
            Assert.True(botRight.Equivalent(new Vector2d(4, 0)));
        }

        [Fact]
        public void UnRotatedRectanglesCollideCorrectly()
        {
            var rect1 = new BoundingRectangle(10, 6)
            {
                Position = new Vector2d(5, 3)
            };
            var rect2 = new BoundingRectangle(3, 3)
            {
                Position = new Vector2d(5, 3)
            };

            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));

            rect2.Position += 3;
            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));

            rect2.Position++;
            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));

            rect2.Position++;
            Assert.False(rect1.Intersects(rect2));
            Assert.False(rect2.Intersects(rect1));
        }

        [Fact]
        public void RotatedRectanglesCollideCorrectly()
        {
            var rect1 = new BoundingRectangle(4.24, 2.83)
            {
                Position = new Vector2d(2.5, 2.5),
                Rotation = - Math.PI / 4
            };
            var rect2 = new BoundingRectangle(6, 4)
            {
                Position = new Vector2d(9, 4)
            };

            Assert.False(rect1.Intersects(rect2));
            Assert.False(rect2.Intersects(rect1));

            rect2.Position.X-=2;

            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));

            rect2.Rotation = Math.PI / 2;
            rect2.Position++;

            Assert.False(rect1.Intersects(rect2));
            Assert.False(rect2.Intersects(rect1));

            rect2.Rotation = Math.PI;
            rect2.Position--;

            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));

            rect2.Position.Y+=10;

            Assert.False(rect1.Intersects(rect2));
            Assert.False(rect2.Intersects(rect1));

            rect2.Position.Y -= 10;
            rect1.Position.X += 5;

            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));

            rect1.Position.X += 9;

            Assert.False(rect1.Intersects(rect2));
            Assert.False(rect2.Intersects(rect1));

            rect1.Rotation = 0;
            rect1.Position.X = 12;
            rect2.Rotation = Math.PI;

            Assert.True(rect1.Intersects(rect2));
            Assert.True(rect2.Intersects(rect1));
        }

        [Fact]
        public void UnrotatedRectangleContainsPointWorks()
        {
            var rect = new BoundingRectangle(6, 4)
            {
                Position = new Vector2d(3, 2)
            };

            Assert.True(rect.ContainsPoint(rect.Position));

            foreach (var vertex in rect.Vertices)
            {
                Assert.True(rect.ContainsPoint(vertex));
            }

            Assert.False(rect.ContainsPoint(new Vector2d(-1, 0)));
            Assert.False(rect.ContainsPoint(rect.TopRight + 1));
            Assert.False(rect.ContainsPoint(rect.BotRight + 1));
            Assert.False(rect.ContainsPoint(rect.TopLeft - 1));
            Assert.False(rect.ContainsPoint(rect.BotLeft - 1));
        }

        [Fact]
        public void RotatedRectangleContainsPointWorks()
        {
            var rect = new BoundingRectangle(4.24, 2.83)
            {
                Position = new Vector2d(2.5, 2.5),
                Rotation = Math.PI / 4
            };

            Assert.True(rect.ContainsPoint(rect.Position));

            foreach (var vertex in rect.Vertices)
            {
                Assert.True(rect.ContainsPoint(vertex));
            }

            Assert.False(rect.ContainsPoint(new Vector2d(-1, 0)));
            Assert.False(rect.ContainsPoint(rect.TopRight + 1));
            Assert.False(rect.ContainsPoint(rect.BotRight + 1));
            Assert.False(rect.ContainsPoint(rect.TopLeft - 1));
            Assert.False(rect.ContainsPoint(rect.BotLeft - 1));

            Assert.True(rect.ContainsPoint(rect.TopRight - 1));
            Assert.True(rect.ContainsPoint(rect.BotRight - 1));
            Assert.True(rect.ContainsPoint(rect.TopLeft + 1));
            Assert.True(rect.ContainsPoint(rect.BotLeft + 1));
        }
    }
}
