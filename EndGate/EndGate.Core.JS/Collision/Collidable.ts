/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="CollisionData.ts" />

module eg.Collision {

    /**
    * Defines a collidable object that can be used to detect collisions with other objects.
    */
    export class Collidable implements IDisposable, _.ITyped {
        public _type: string = "Collidable";
        public _id: number;

        /**
        * Gets or sets the Bounds of the collidable.
        */
        public Bounds: Bounds.Abstractions.Bounds2d;

        private static _collidableIDs: number = 0;
        private _disposed: bool;
        private _onCollision: EventHandler1<Assets.CollisionData>;
        private _onDisposed: EventHandler1<Collidable>;

        /**
        * Creates a new instance of Collidable.
        * @param bounds Initial bounds for the Collidable.
        */
        constructor(bounds: Bounds.Abstractions.Bounds2d) {
            this._disposed = false;
            this.Bounds = bounds;
            this._id = Collidable._collidableIDs++;

            this._onCollision = new EventHandler1<Assets.CollisionData>();
            this._onDisposed = new EventHandler1<Collidable>();
        }

        /**
        * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnCollision(): EventHandler1<Assets.CollisionData> {
            return this._onCollision;
        }
        /**
        * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnDisposed(): EventHandler1<Collidable> {
            return this._onDisposed;
        }

        /**
        * Determines if the provided collidable is colliding with this Collidable.
        * @param other Collidable to check collision with.
        */
        public IsCollidingWith(other: Collidable): bool {
            return this.Bounds.Intersects(other.Bounds);
        }

        /**
        * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
        * @param data Collision information related to the collision.
        */
        public Collided(data: Assets.CollisionData): void {
            this.OnCollision.Trigger(data);
        }

        /**
        * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this.OnDisposed.Trigger(this);
            }
            else {
                throw new Error("Cannot dispose collidable more than once.");
            }
        }
    }

}