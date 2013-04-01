using System;

namespace EndGate.Core
{
    public abstract class Collidable
    {
        public event Action<Collidable> OnCollision;

        public virtual void CollidedWith(Collidable obj)
        {
            if (OnCollision != null)
            {
                OnCollision(obj);
            }
        }
    }
}