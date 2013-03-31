using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndGate.Core
{
    public class Collidable
    {
        public event Action<Collidable> OnCollision;

        public abstract void CollidedWith(Collidable obj)
        {
            if (OnCollision != null)
            {
                OnCollision(obj);
            }
        }
    }
}
