/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="BoundingRectangle.ts" />
/// <reference path="Bounds2d.ts" />

module EndGate.Core.BoundingObject {

    import Assets = module(EndGate.Core.Assets);

    export class BoundingCircle implements ITyped extends Bounds2d {
        public _type: string = "BoundingCircle";

        public Radius: number;

        constructor(radius: number) {
            super();

            this.Radius = radius;
        }

        private static ClosestTo(val: number, topLeft: Assets.Vector2d, botRight: Assets.Vector2d): number
        {
            if (val < topLeft.X) {
                return topLeft.X;
            }
            else if (val > botRight.X) {
                return botRight.X;
            }

            return val;
        }

        public Area(): number {
            return Math.PI * this.Radius * this.Radius;
        }

        public Circumfrence(): number {
            return 2 * Math.PI * this.Radius;
        }

        public IntersectsCircle(circle: BoundingCircle): bool {
            return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
        }

        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            var translated = (rectangle.Rotation === 0)
                                  ? this.Position
                                  : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

            var unrotatedTopLeft: Assets.Vector2d = new Assets.Vector2d(rectangle.Position.X - rectangle.Size.HalfWidth(), rectangle.Position.Y - rectangle.Size.HalfHeight()),
                unrotatedBotRight = new Assets.Vector2d(rectangle.Position.X + rectangle.Size.HalfWidth(), rectangle.Position.Y + rectangle.Size.HalfHeight()),
                closest = new Assets.Vector2d(BoundingCircle.ClosestTo(translated.X, unrotatedTopLeft, unrotatedBotRight), BoundingCircle.ClosestTo(translated.Y, unrotatedTopLeft, unrotatedBotRight));

            return translated.Distance(closest).Magnitude() < this.Radius;
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            return this.Position.Distance(point).Magnitude() < this.Radius;
        }
    }

}