/// <reference path="../Assets/Vectors/Helpers/Vector2dHelpers.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="BoundingCircle.ts" />
/// <reference path="Bounds2d.ts" />

module EndGate.Bounds {

    /**
    * Defines a rectangle that can be used to detect intersections.
    */
    export class BoundingRectangle extends Bounds2d implements _.ITyped {
        public _type: string = "BoundingRectangle";
        public _boundsType: string = "BoundingRectangle";

        /**
        * Gets or sets the Size of the rectangle.
        */
        public Size: Size2d;

        /**
        * Creates a new instance of BoundingRectangle.
        * @param position Initial Position of the BoundingRectangle.
        * @param size Initial Size of the BoundingRectangle.
        */
        constructor(position: Vector2d, size: Size2d) {
            super(position);
            this.Size = size;
        }

        /**
        * Scales the width and height of the BoundingRectangle.
        * @param x Value to multiply the width by.
        * @param y Value to multiply the height by.
        */
        public Scale(x: number, y: number): void {
            this.Size.Width *= x;
            this.Size.Height *= y;
        }

        /** 
        * Gets the top left corner of the BoundingRectangle.
        */
        public get TopLeft(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the top right corner of the BoundingRectangle.
        */
        public get TopRight(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the bottom left corner of the BoundingRectangle.
        */
        public get BotLeft(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /** 
        * Gets the bottom right corner of the BoundingRectangle.
        */
        public get BotRight(): Vector2d {
            if (this.Rotation === 0) {
                return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
            }

            return new Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
        }

        /**
        * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
        */
        public Corners(): Vector2d[] {
            return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            return circle.IntersectsRectangle(this);
        }

        /**
        * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            if (this.Rotation === 0 && rectangle.Rotation === 0) {
                var myTopLeft = this.TopLeft,
                    myBotRight = this.BotRight,
                    theirTopLeft = rectangle.TopLeft,
                    theirBotRight = rectangle.BotRight;

                return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
            }
            else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {// Check if we're somewhat close to the rectangle ect that we might be colliding with
                var axisList: Vector2d[] = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                var myVertices = this.Corners();
                var theirVertices = rectangle.Corners();

                for (var i: number = 0; i < axisList.length; i++) {
                    var axi = axisList[i];
                    var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                    var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                    // No collision
                    if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                        return false;
                    }
                }

                return true;
            }

            return false;
        }

        /**
        * Determines if the current BoundingRectangle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): boolean {
            var savedRotation: number = this.Rotation;

            if (this.Rotation !== 0) {
                this.Rotation = 0;
                point = point.RotateAround(this.Position, -savedRotation);
            }

            var myTopLeft = this.TopLeft,
                myBotRight = this.BotRight;

            this.Rotation = savedRotation;

            return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
        }

        /**
        * Determines if the current BoundingRectangle completely contains the provided BoundingCircle.
        * @param point A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            return this.ContainsPoint(new Vector2d(circle.Position.X - circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X, circle.Position.Y - circle.Radius)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X + circle.Radius, circle.Position.Y)) &&
                this.ContainsPoint(new Vector2d(circle.Position.X, circle.Position.Y + circle.Radius));
        }

        /**
        * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
        * @param point A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            var corners = rectangle.Corners();

            for (var i = 0; i < corners.length; i++) {
                if (!this.ContainsPoint(corners[i])) {
                    return false;
                }
            }

            return true;
        }
    }

}