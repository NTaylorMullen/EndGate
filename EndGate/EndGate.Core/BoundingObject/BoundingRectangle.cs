using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EndGate.Core.Assets;
using EndGate.Core.Assets.Sizes;

namespace EndGate.Core.BoundingObject
{
    public class BoundingRectangle : Bounds2d
    {
        public BoundingRectangle(Size2d size)
        {
            Size = size;
        }

        public BoundingRectangle(double width, double height)
        {
            Size = new Size2d(width, height);
        }

        public Size2d Size { get; set; }

        public Vector2d TopLeft 
        { 
            get
            {
                return new Vector2d(Position.X - Size.HalfWidth, Position.Y - Size.HalfHeight);
            }
        }

        public Vector2d TopRight
        {
            get
            {
                return new Vector2d(Position.X + Size.HalfWidth, Position.Y - Size.HalfHeight);
            }
        }

        public Vector2d BotLeft
        {
            get
            {
                return new Vector2d(Position.X - Size.HalfWidth, Position.Y + Size.HalfHeight);
            }
        }

        public Vector2d BotRight
        {
            get
            {
                return new Vector2d(Position.X + Size.HalfWidth, Position.Y + Size.HalfHeight);
            }
        }

        public override bool IsCollidingWith(BoundingCircle obj)
        {
            throw new NotImplementedException();
        }

        public override bool IsCollidingWith(BoundingRectangle obj)
        {
            throw new NotImplementedException();
        }

        public override bool ContainsPoint(Vector2d point)
        {
            throw new NotImplementedException();
        }
    }
}
