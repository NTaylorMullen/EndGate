using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Net.Assets;

namespace EndGate.Core.Net.Collision
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
