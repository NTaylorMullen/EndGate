using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;

namespace EndGate.Core.BoundingObject
{
    public abstract class Bounds2d : Collidable
    {
        public Vector2d Position { get; set; }
        public double Rotation { get; set; }

        public abstract bool ContainsPoint(Vector2d point);
        public abstract bool IsCollidingWith(BoundingCircle circle);
        public abstract bool IsCollidingWith(BoundingRectangle rectangle);
    }
}