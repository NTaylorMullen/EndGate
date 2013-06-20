/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="BoundingRectangle.ts" />
/// <reference path="Bounds2d.ts" />

module EndGate.Bounds {

    /**
    * Defines a circle that can be used to detect intersections.
    */
    export class BoundingCircle extends Abstractions.Bounds2d implements _.ITyped {
        public _type: string = "BoundingCircle";
        public _boundsType: string = "BoundingCircle";

        /**
        * Gets or sets the Radius of the circle.
        */
        public Radius: number;

        /**
        * Creates a new instance of BoundingCircle.
        * @param position Initial Position of the BoundingCircle.
        * @param radius Initial Radius of the BoundingCircle.
        */
        constructor(position: Vector2d, radius: number) {
            super(position);

            this.Radius = radius;
        }

        /**
        * Scales the radius of the BoundingCircle.
        * @param scale Value to multiply the radius by.
        */
        public Scale(scale: number): void {
            // This is an overloaded version of Bounds2d Scale but we don't care
            // about the second parameter within a BoundingCircle
            this.Radius *= scale;
        }

        /**
        * Calculates the area of the BoundingCircle.
        */
        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        /**
        * Calculates the circumference of the BoundingCircle.
        */
        public Circumference(): number {
            return 2 * Math.PI * this.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        /**
        * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            var translated = (rectangle.Rotation === 0)
                                  ? this.Position
                                  : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            var circleDistance = translated.Distance(rectangle.Position);

            if (circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) { return false; }
            if (circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) { return false; }

            if (circleDistance.X <= (rectangle.Size.HalfWidth())) { return true; }
            if (circleDistance.Y <= (rectangle.Size.HalfHeight())) { return true; }

            var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);

            return (cornerDistance_sq <= (this.Radius * this.Radius));
        }

        /**
        * Determines if the current BoundingCircle contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }
    }

}