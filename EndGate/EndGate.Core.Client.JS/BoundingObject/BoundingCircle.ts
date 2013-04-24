/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="BoundingRectangle.ts" />
/// <reference path="Bounds2d.ts" />

module EndGate.Core.BoundingObject {

    export class BoundingCircle implements ITyped extends Bounds2d {
        public _type: string = "BoundingCircle";
        public _boundsType: string = "BoundingCircle";

        public Radius: number;

        constructor(position: Assets.Vector2d, radius: number) {
            super(position);

            this.Radius = radius;
        }

        public Scale(x: number, y: number): void {
            this.Radius *= x;
        }

        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        public Circumfrence(): number {
            return 2 * Math.PI * this.Radius;
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsCircle(circle: EndGate.Core.BoundingObject.BoundingCircle): bool {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        // For some reason when compiled into a single .ts file if this isn't fully declared it doesn't compile
        public IntersectsRectangle(rectangle: EndGate.Core.BoundingObject.BoundingRectangle): bool {
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

        public ContainsPoint(point: Assets.Vector2d): bool {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }
    }

}