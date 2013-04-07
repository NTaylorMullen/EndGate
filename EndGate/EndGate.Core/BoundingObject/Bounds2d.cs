using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;

namespace EndGate.Core.BoundingObject
{
    public abstract class Bounds2d
    {
        public Bounds2d()
        {
            Position = Vector2d.Zero;
            Rotation = 0;
        }

        public Vector2d Position { get; set; }
        public double Rotation { get; set; }

        public abstract bool ContainsPoint(Vector2d point);
        public abstract bool Intersects(Bounds2d obj);
        public abstract bool Intersects(BoundingCircle circle);
        public abstract bool Intersects(BoundingRectangle rectangle);
    }
}