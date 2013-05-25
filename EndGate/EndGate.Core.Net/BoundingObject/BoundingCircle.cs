using System;
using EndGate.Core.Net.Assets;

namespace EndGate.Core.Net.BoundingObject
{
    public class BoundingCircle : Bounds2d
    {
        public BoundingCircle(double radius)
        {
            Radius = radius;
        }

        public double Radius { get; set; }

        public double Area()
        {
            return Math.PI * Radius * Radius;
        }

        public double Circumference()
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

            var circleDistance = translated.Distance(rectangle.Position);

            if (circleDistance.X > (rectangle.Size.HalfWidth + this.Radius)) { return false; }
            if (circleDistance.Y > (rectangle.Size.HalfHeight + this.Radius)) { return false; }

            if (circleDistance.X <= (rectangle.Size.HalfWidth)) { return true; }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight)) { return true; }

            var cornerDistance_sq = Math.Pow(circleDistance.X - rectangle.Size.HalfWidth, 2) + Math.Pow(circleDistance.Y - rectangle.Size.HalfHeight, 2);

            return (cornerDistance_sq <= (this.Radius * this.Radius));
        }

        public override bool ContainsPoint(Vector2d point)
        {
            return Position.Distance(point).Magnitude() < Radius;
        }
    }
}
