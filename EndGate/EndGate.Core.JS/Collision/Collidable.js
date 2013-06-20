var eg;
(function (eg) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../Bounds/Bounds2d.ts" />
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="CollisionData.ts" />
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

                this.OnCollision = new eg.EventHandler1();
                this.OnDisposed = new eg.EventHandler1();
            }
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
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            Collidable._collidableIDs = 0;
            return Collidable;
        })();
        Collision.Collidable = Collidable;
    })(eg.Collision || (eg.Collision = {}));
    var Collision = eg.Collision;
})(eg || (eg = {}));
