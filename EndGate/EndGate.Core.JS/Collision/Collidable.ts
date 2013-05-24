/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="CollisionData.ts" />

module EndGate.Collision {

    export class Collidable implements IDisposable, _.ITyped {
        public _type: string = "Collidable";

        public Bounds: Bounds.Abstractions.Bounds2d;
        public ID: number;

        private static _collidableIDs: number = 0;
        private _disposed: bool;

        constructor(bounds: Bounds.Abstractions.Bounds2d) {
            this._disposed = false;
            this.Bounds = bounds;
            this.ID = Collidable._collidableIDs++;

            this.OnCollision = new EventHandler();
            this.OnDisposed = new EventHandler();
        }

        public OnCollision: EventHandler;
        public OnDisposed: EventHandler;

        public IsCollidingWith(other: Collidable): bool {
            return this.Bounds.Intersects(other.Bounds);
        }

        public Collided(data: Assets.CollisionData): void {
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