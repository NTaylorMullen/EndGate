var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../Bounds/Bounds2d.ts" />
    /// <reference path="../Utilities/EventHandler.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="CollisionData.ts" />
    (function (Collision) {
        /**
        * Defines a collidable object that can be used to detect collisions with other objects.
        */
        var Collidable = (function () {
            /**
            * Creates a new instance of Collidable.
            * @param position Initial bounds for the Collidable.
            */
            function Collidable(bounds) {
                this._type = "Collidable";
                this._disposed = false;
                this.Bounds = bounds;
                this._id = Collidable._collidableIDs++;
                this.OnCollision = new EndGate.EventHandler();
                this.OnDisposed = new EndGate.EventHandler();
            }
            Collidable._collidableIDs = 0;
            Collidable.prototype.IsCollidingWith = /**
            * Determines if the provided collidable is colliding with this Collidable.
            * @param other Collidable to check collision with.
            */
            function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };
            Collidable.prototype.Collided = /**
            * Triggers the OnCollision event.  Can also be overridden from derived classes to be called when a collision occurs if the collidable is being used with a CollisionManager
            * @param data Collision information related to the collision.
            */
            function (data) {
                this.OnCollision.Trigger(data);
            };
            Collidable.prototype.Dispose = /**
            * Triggers the OnDisposed event.  If this Collidable is used with a CollisionManager it will be unmonitored when disposed.
            */
            function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                } else {
                    throw new Error("Cannot dispose collidable more than once.");
                }
            };
            return Collidable;
        })();
        Collision.Collidable = Collidable;        
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
