/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference  path="BoundingRectangle.ts" />
/// <reference  path="BoundingCircle.ts" />

module eg.Bounds.Abstractions {

    /**
    * Abstract bounds type that is used to detect intersections.
    */
    export class Bounds2d implements IMoveable {
        public _boundsType: string = "Bounds2d";

        /**
        * Gets or sets the Position of the bounds.
        */
        public Position: Vector2d;
        /**
        * Gets or sets the Rotation of the bounds.
        */
        public Rotation: number;

        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        */
        constructor(position: Vector2d);
        /**
        * Should only ever be called by derived classes.
        * @param position Initial Position of the current bounded object.
        * @param rotation Initial Rotation of the current bounded object.
        */
        constructor(position: Vector2d, rotation: number);
        constructor(position: Vector2d, rotation?: number) {
            this.Position = position;
            this.Rotation = rotation || 0;
        }

        /**
        * Abstract: Scales the size of the bounded object.
        * @param x Value to multiply the horizontal component by.
        * @param y Value to multiply the vertical component by.
        */
        public Scale(x: number, y: number): void {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point.
        */
        public ContainsPoint(point: Vector2d): bool {
            throw new Error("This method is abstract!");
        }

        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param obj Bounding object to check collision with.
        */
        public Intersects(obj: Bounds2d): bool;
        /**
        * Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public Intersects(circle: BoundingCircle): bool;
        /**
        * Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public Intersects(rectangle: BoundingRectangle): bool;
        public Intersects(obj: any): bool {
            if (obj._boundsType === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
            }
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): bool {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): bool {
            throw new Error("This method is abstract!");
        }
    }

}