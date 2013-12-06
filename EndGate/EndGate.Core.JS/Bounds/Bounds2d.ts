/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />

module EndGate.Bounds {

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
        public ContainsPoint(point: Vector2d): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingCircle.
        * @param circle A circle to check containment on.
        */
        public ContainsCircle(circle: BoundingCircle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object completely contains the provided BoundingRectangle.
        * @param rectangle A rectangle to check containment on.
        */
        public ContainsRectangle(rectangle: BoundingRectangle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object contains the provided Vector2d.
        * @param point A point to check containment on.
        */
        public Contains(point: Vector2d): boolean;
        /**
        * Abstract: Determines if the current bounded object completely contains another bounded object.
        * @param obj A bounded object to check containment on.
        */
        public Contains(obj: Bounds2d): boolean;
        public Contains(obj: any): boolean {
            if (obj._boundsType === "BoundingCircle") {
                return this.ContainsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.ContainsRectangle(obj);
            }
            else if(obj._type === "Vector2d") {
                return this.ContainsPoint(obj);
            }
            else {
                throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
            }
        }

        /**
        * Determines if the current bounded object intersects another bounded object.
        * @param obj Bounding object to check collision with.
        */
        public Intersects(obj: Bounds2d): boolean;        
        public Intersects(obj: any): boolean {
            if (obj._boundsType === "BoundingCircle") {
                return this.IntersectsCircle(obj);
            }
            else if (obj._boundsType === "BoundingRectangle") {
                return this.IntersectsRectangle(obj);
            }
            else {
                throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
            }
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
        * @param circle BoundingCircle to check intersection with.
        */
        public IntersectsCircle(circle: BoundingCircle): boolean {
            throw new Error("This method is abstract!");
        }

        /**
        * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
        * @param rectangle BoundingRectangle to check intersection with.
        */
        public IntersectsRectangle(rectangle: BoundingRectangle): boolean {
            throw new Error("This method is abstract!");
        }
    }

}