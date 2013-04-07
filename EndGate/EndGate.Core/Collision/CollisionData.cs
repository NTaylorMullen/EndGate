using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;

namespace EndGate.Core.Collision
{
    public class CollisionData
    {
        public CollisionData(Vector2d at, Collidable with)
        {
            At = at;
            With = with;
        }

        public Vector2d At { get; private set; }
        public Collidable With { get; private set; }
    }
}
