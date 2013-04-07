using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;

namespace EndGate.Core.BoundingObject
{
    public class BoundingCircle : Bounds2d
    {
        public BoundingCircle(double radius)
        {
            Radius = radius;
        }

        public double Radius { get; set; }

        private static double ClosestTo(double val, Vector2d topLeft, Vector2d botRight)
        {
            if (val < topLeft.X)
            {
                return topLeft.X;
            }
            else if (val > botRight.X)
            {
                return botRight.X;
            }

            return val;
        }

        public double Area()
        {
            return Math.PI * Radius * Radius;
        }

        public double Circumfrence()
        {
            return 2 * Math.PI * Radius;
        }

        public override bool Intersects(Bounds2d obj)
        {
            return obj.Intersects(this);
        }

        public override bool Intersects(BoundingCircle circle)
        {
            return Position.Distance(circle.Position).Length() < Radius + circle.Radius;
        }

        public override bool Intersects(BoundingRectangle rectangle)
        {
            Vector2d translated = rectangle.Rotation == 0 
                                  ? Position 
                                  : Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            Vector2d unrotatedTopLeft = new Vector2d(rectangle.Position.X - rectangle.Size.HalfWidth, rectangle.Position.Y - rectangle.Size.HalfHeight),
                     unrotatedBotRight = new Vector2d(rectangle.Position.X + rectangle.Size.HalfWidth, rectangle.Position.Y + rectangle.Size.HalfHeight),
                     closest = new Vector2d(ClosestTo(translated.X, unrotatedTopLeft, unrotatedBotRight), ClosestTo(translated.Y, unrotatedTopLeft, unrotatedBotRight));

             return translated.Distance(closest).Magnitude() < Radius;
        }

        public override bool ContainsPoint(Vector2d point)
        {
            return Position.Distance(point).Magnitude() < Radius;
        }
    }
}
