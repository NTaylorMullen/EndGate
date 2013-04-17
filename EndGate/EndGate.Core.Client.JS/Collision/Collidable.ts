/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../BoundingObject/IBounds2d.d.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="CollisionData.ts" />

module EndGate.Core.Collision {

    export class Collidable implements IDisposable, ITyped, BoundingObject.IBounds2d {
        public _type: string = "Collidable";
        public _boundsType: string = "Collidable";

        public Position: Assets.Vector2d;
        public Rotation: number;
        public ID: number;

        private static _collidableIDs: number = 0;
        private _disposed: bool;

        constructor(bounds: BoundingObject.IBounds2d) {
            // This is the #1 hack of this library. Since currently TypeScript does not support
            // generics yet (0.9 hasn't been released yet) I need replace all of the IBounds2d
            // functions with ones that have been passed through.
            for (var property in bounds) {
                this[property] = bounds[property];
            }

            this._disposed = false;
            this.ID = Collidable._collidableIDs++;

            this.OnCollision = new Utilities.EventHandler();
            this.OnDisposed = new Utilities.EventHandler();
        }

        public OnCollision: Utilities.EventHandler;
        public OnDisposed: Utilities.EventHandler;

        public IsCollidingWith(other: BoundingObject.IBounds2d): bool {
            return this.Intersects(other);
        }

        public Collided(data: CollisionData): void {
            this.OnCollision.Trigger(data);
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
            }
            else {
                throw new Error("Cannot dispose collidable twice.");
            }
        }

        // *****        These are all replaced within the constructor by the bounds2d that are passed down to this layer.       *****

        private ContainsPoint(point: Assets.Vector2d): bool {
            throw new Error("This method is abstract!");
        }

        private Intersects(obj: BoundingObject.IBounds2d): bool;
        private Intersects(circle: BoundingObject.BoundingCircle): bool;
        private Intersects(rectangle: BoundingObject.BoundingRectangle): bool;
        private Intersects(obj: any): bool {
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

        private IntersectsCircle(circle: BoundingObject.BoundingCircle): bool {
            throw new Error("This method is abstract!");
        }

        private IntersectsRectangle(rectangle: BoundingObject.BoundingRectangle): bool {
            throw new Error("This method is abstract!");
        }

        // *****        These are all replaced within the constructor by the bounds2d that are passed down to this layer.       *****
    }

}