/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="../Bounds/Bounds2d.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="CollisionData.ts" />
var EndGate;
(function (EndGate) {
    (function (Collision) {
        /**
        * Defines a collidable object that can be used to detect collisions with other objects.
        */
        var Collidable = (function () {
            /**
            * Creates a new instance of Collidable.
            * @param bounds Initial bounds for the Collidable.
            */
            function Collidable(bounds) {
                this._type = "Collidable";
                this._disposed = false;
                this.Bounds = bounds;
                this._id = Collidable._collidableIDs++;

                this._onCollision = new EndGate.EventHandler1();
                this._onDisposed = new EndGate.EventHandler1();
            }
            Object.defineProperty(Collidable.prototype, "OnCollision", {
                /**
                * Gets an event that is triggered when a collision happens.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onCollision;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Collidable.prototype, "OnDisposed", {
                /**
                * Gets an event that is triggered when the Collidable has been disposed.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onDisposed;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the provided collidable is colliding with this Collidable.
            * @param other Collidable to check collision with.
            */
            Collidable.prototype.IsCollidingWith = function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };

            /**
            * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
            * @param data Collision information related to the collision.
            */
            Collidable.prototype.Collided = function (data) {
                this.OnCollision.Trigger(data);
            };

            /**
            * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
            */
            Collidable.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                    this.OnDisposed.Dispose();
                    this.OnCollision.Dispose();
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            Collidable._collidableIDs = 0;
            return Collidable;
        })();
        Collision.Collidable = Collidable;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
