using System;
using System.Threading;
using EndGate.Core.Net.Assets;
using EndGate.Core.Net.BoundingObject;
using EndGate.Core.Net.Collision;
using Xunit;

namespace EndGate.Core.Net.Tests
{
    public class CollisionManagerFacts
    {
        [Fact]
        public void CollisionManagerDetectsCollisions()
        {
            var cm = new CollisionManager();
            var rect = new Collidable(new BoundingRectangle(new Size2d(30, 50)));
            var circle = new Collidable(new BoundingCircle(10));
            bool rectCollisionTriggered = false;
            bool circleCollisionTriggered = false;
            bool managerCollisionTriggered = false;

            cm.Monitor(rect);
            cm.Monitor(circle);

            rect.OnCollision += collisionData =>
            {
                Assert.True(rect.Bounds.Position.Equivalent(collisionData.At));
                Assert.Equal(circle, collisionData.With);
                rectCollisionTriggered = true;
            };

            circle.OnCollision += collisionData =>
            {
                Assert.True(circle.Bounds.Position.Equivalent(collisionData.At));
                Assert.Equal(rect, collisionData.With);
                circleCollisionTriggered = true;
            };

            cm.OnCollision += (first, second) =>
            {
                Assert.NotNull(first);
                Assert.NotNull(second);
                Assert.Equal(first, rect);
                Assert.Equal(second, circle);
                managerCollisionTriggered = true;
            };

            cm.Update(null);

            Assert.True(rectCollisionTriggered);
            Assert.True(circleCollisionTriggered);
            Assert.True(managerCollisionTriggered);

            rectCollisionTriggered = false;
            circleCollisionTriggered = false;
            managerCollisionTriggered = false;

            cm.Unmonitor(circle);
            cm.Update(null);

            Assert.False(rectCollisionTriggered);
            Assert.False(circleCollisionTriggered);
            Assert.False(managerCollisionTriggered);

            cm.Monitor(circle);
            cm.Update(null);

            Assert.True(rectCollisionTriggered);
            Assert.True(circleCollisionTriggered);
            Assert.True(managerCollisionTriggered);

            rectCollisionTriggered = false;
            circleCollisionTriggered = false;
            managerCollisionTriggered = false;

            circle.Dispose();

            cm.Update(null);

            Assert.False(rectCollisionTriggered);
            Assert.False(circleCollisionTriggered);
            Assert.False(managerCollisionTriggered);
        }

        [Fact]
        public void CollisionManagerWorksWithinGame()
        {
            var rect = new Collidable(new BoundingRectangle(new Size2d(30, 50)));
            var circle = new Collidable(new BoundingCircle(10));
            var game = new CollisionManagerGame();

            game.MonitorCollision(rect);
            game.MonitorCollision(circle);

            int rectCollisionTriggered = 0;
            int circleCollisionTriggered = 0;
            int managerCollisionTriggered = 0;

            rect.OnCollision += collisionData =>
            {
                Assert.True(rect.Bounds.Position.Equivalent(collisionData.At));
                Assert.Equal(circle, collisionData.With);
                rectCollisionTriggered++;
            };

            circle.OnCollision += collisionData =>
            {
                Assert.True(circle.Bounds.Position.Equivalent(collisionData.At));
                Assert.Equal(rect, collisionData.With);
                circleCollisionTriggered++;
            };

            game.RegisterCollisionEvent((first, second) =>
            {
                Assert.NotNull(first);
                Assert.NotNull(second);
                Assert.Equal(first, rect);
                Assert.Equal(second, circle);
                managerCollisionTriggered++;
            });

            Thread.Sleep(TimeSpan.FromSeconds(1));

            Assert.True(rectCollisionTriggered > 10);
            Assert.True(circleCollisionTriggered > 10);
            Assert.True(managerCollisionTriggered > 10);

            rect.Dispose();
            var savedRectCollisions = rectCollisionTriggered;
            var savedCircleCollisions = circleCollisionTriggered;
            var savedmanagerCollisions = managerCollisionTriggered;

            Thread.Sleep(TimeSpan.FromSeconds(1));

            Assert.Equal(savedRectCollisions, rectCollisionTriggered);
            Assert.Equal(savedCircleCollisions, circleCollisionTriggered);
            Assert.Equal(savedmanagerCollisions, managerCollisionTriggered);
        }

        private class CollisionManagerGame : Game
        {
            public void MonitorCollision(Collidable obj)
            {
                CollisionManager.Monitor(obj);
            }

            public void RegisterCollisionEvent(Action<Collidable, Collidable> e)
            {
                CollisionManager.OnCollision += e;
            }
        }
    }
}
