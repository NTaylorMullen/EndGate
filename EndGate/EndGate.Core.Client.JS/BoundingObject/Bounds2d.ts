/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference  path="BoundingRectangle.ts" />
/// <reference  path="BoundingCircle.ts" />

module EndGate.Core.BoundingObject {

    import Assets = module(EndGate.Core.Assets);

    export class Bounds2d {

        public Position: Assets.Vector2d;
        public Rotation: number;

        constructor() {
            this.Position = Assets.Vector2d.Zero();
            this.Rotation = 0;
        }

        public ContainsPoint(point: Assets.Vector2d): bool {
            throw new Error("This method is abstract!");
        }

        public Intersects(obj: Bounds2d): bool;
        public Intersects(circle: BoundingCircle): bool;
        public Intersects(rectangle: BoundingRectangle): bool;
        public Intersects(obj: any): bool {
            if (obj._type === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._type === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
            }
        }

        public IntersectsCircle(circle: BoundingCircle): bool {
            throw new Error("This method is abstract!");
        }

        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            throw new Error("This method is abstract!");
        }
    }

}