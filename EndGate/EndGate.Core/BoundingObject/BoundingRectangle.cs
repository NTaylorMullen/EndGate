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
                var v = new Vector2d(Position.X - Size.HalfWidth, Position.Y - Size.HalfHeight);
                if (Rotation == 0)
                {
                    return v;
                }

                return v.RotateAround(Position, Rotation);
            }
            set
            {
                Position = new Vector2d(value.X + Size.HalfWidth, value.Y + Size.HalfHeight);
            }
        }

        public Vector2d TopRight
        {
            get
            {
                var v = new Vector2d(Position.X + Size.HalfWidth, Position.Y - Size.HalfHeight);
                if (Rotation == 0)
                {
                    return v;
                }

                return v.RotateAround(Position, Rotation);
            }
            set
            {
                Position = new Vector2d(value.X - Size.HalfWidth, value.Y + Size.HalfHeight);
            }
        }

        public Vector2d BotLeft
        {
            get
            {
                var v = new Vector2d(Position.X - Size.HalfWidth, Position.Y + Size.HalfHeight);
                if (Rotation == 0)
                {
                    return v;
                }

                return v.RotateAround(Position, Rotation);
            }
            set
            {
                Position = new Vector2d(value.X + Size.HalfWidth, value.Y - Size.HalfHeight);
            }
        }

        public Vector2d BotRight
        {
            get
            {
                var v = new Vector2d(Position.X + Size.HalfWidth, Position.Y + Size.HalfHeight);
                if (Rotation == 0)
                {
                    return v;
                }

                return v.RotateAround(Position, Rotation);
            }
            set
            {
                Position = new Vector2d(value.X - Size.HalfWidth, value.Y - Size.HalfHeight);
            }
        }

        public override bool IsCollidingWith(BoundingCircle obj)
        {
            throw new NotImplementedException();
        }

        public override bool IsCollidingWith(BoundingRectangle obj)
        {
            if (Rotation == 0)
            {
                Vector2d myTopLeft = TopLeft,
                         myBotRight = BotRight,
                         theirTopLeft = obj.TopLeft,
                         theirBotRight = obj.BotRight;

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;

            }
            else if (obj.Position.Distance(Position).Magnitude() <= obj.Size.Radius) // Check if we're somewhat close to the object that we might be colliding with
            {

            }
            
            return false;
        }

        public override bool ContainsPoint(Vector2d point)
        {
            throw new NotImplementedException();
        }
    }
}
