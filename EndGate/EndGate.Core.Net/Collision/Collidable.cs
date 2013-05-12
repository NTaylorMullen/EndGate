using System;
using System.Threading;
using EndGate.Core.Net.BoundingObject;

namespace EndGate.Core.Net.Collision
{
    public class Collidable : IDisposable
    {
        private static long _collidableIDs = 0;

        private long _disposed;

        public Collidable(Bounds2d bounds)
        {
            _disposed = 0;

            Bounds = bounds;
            ID = Interlocked.Increment(ref _collidableIDs);

            // Set a default collision event so we don't have to check if its null
            OnCollision = obj => { };
            OnDisposed = obj => { };
        }

        public event Action<CollisionData> OnCollision;
        public event Action<Collidable> OnDisposed;

        public Bounds2d Bounds { get; set; }

        internal long ID { get; private set; }

        public bool IsCollidingWith(Collidable other)
        {
            return this.Bounds.Intersects(other.Bounds);
        }

        public void Collided(CollisionData data)
        {
            OnCollision(data);
        }

        public virtual void Dispose()
        {
            if (Interlocked.Exchange(ref _disposed, 1) == 0)
            {
                OnDisposed(this);
            }
            else
            {
                throw new InvalidOperationException("Cannot dispose collidable twice.");
            }
        }
    }
}