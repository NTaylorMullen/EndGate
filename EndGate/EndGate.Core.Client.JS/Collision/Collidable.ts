/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="../BoundingObject/Bounds2d.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="CollisionData.ts" />

module EndGate.Core.Collision {

    export class Collidable implements IDisposable, ITyped {
        public _type: string = "Collidable";

        public Bounds: BoundingObject.Bounds2d;
        public ID: number;

        private static _collidableIDs: number = 0;
        private _disposed: bool;

        constructor(bounds: BoundingObject.Bounds2d) {
            this._disposed = false;
            this.Bounds = bounds;
            this.ID = Collidable._collidableIDs++;

            this.OnCollision = new Utilities.EventHandler();
            this.OnDisposed = new Utilities.EventHandler();
        }

        public OnCollision: Utilities.EventHandler;
        public OnDisposed: Utilities.EventHandler;

        public IsCollidingWith(other: Collidable): bool {
            return this.Bounds.Intersects(other.Bounds);
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
    }

}