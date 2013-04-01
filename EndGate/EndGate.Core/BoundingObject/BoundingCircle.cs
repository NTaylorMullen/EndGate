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

        public override bool IsCollidingWith(BoundingCircle circle)
        {
            return Position.Distance(circle.Position).Length() < Radius + circle.Radius;
        }

        public override bool IsCollidingWith(BoundingRectangle rectangle)
        {
            Vector2d translated = rectangle.Rotation == 0 
                                  ? Position 
                                  : new Vector2d
                                    {
                                        X = Math.Cos(-rectangle.Rotation) * (Position.X - rectangle.Position.X) - Math.Sin(-rectangle.Rotation) * (Position.Y - rectangle.Position.Y) + rectangle.Position.X,
                                        Y = Math.Sin(-rectangle.Rotation) * (Position.X - rectangle.Position.X) + Math.Cos(-rectangle.Rotation) * (Position.Y - rectangle.Position.Y) + rectangle.Position.Y
                                    };

            Vector2d topLeft = rectangle.TopLeft,
                     botRight = rectangle.BotRight,
                     closest = new Vector2d(ClosestTo(translated.X, topLeft, botRight), ClosestTo(translated.Y, topLeft, botRight));

             return translated.Distance(closest).Magnitude() < Radius;
        }

        public override bool ContainsPoint(Vector2d point)
        {
            return Position.Distance(point).Magnitude() < Radius;
        }
    }
}
