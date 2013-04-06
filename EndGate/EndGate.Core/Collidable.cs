using System;
using EndGate.Core.BoundingObject;

namespace EndGate.Core
{
    public abstract class Collidable
    {
        public event Action<Collidable> OnCollision;

        public Collidable(Bounds2d bounds)
        {
            Bounds = bounds;

            // Set a default collision event so we don't have to check if its null
            OnCollision += obj => { };
        }

        public Bounds2d Bounds { get; set; }

        public void CheckCollision(Collidable other)
        {
            if (this.Bounds.Intersects(other.Bounds))
            {
                OnCollision(other);
            }
        }
    }
}