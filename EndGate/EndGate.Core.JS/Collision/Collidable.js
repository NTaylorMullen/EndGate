var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IDisposable.ts" />
    /// <reference path="../Interfaces/ITyped.ts" />
    /// <reference path="../Bounds/Bounds2d.ts" />
    /// <reference path="../Utilities/EventHandler.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="CollisionData.ts" />
    (function (Collision) {
        var Collidable = (function () {
            function Collidable(bounds) {
                this._type = "Collidable";
                this._disposed = false;
                this.Bounds = bounds;
                this.ID = Collidable._collidableIDs++;
                this.OnCollision = new EndGate.EventHandler();
                this.OnDisposed = new EndGate.EventHandler();
            }
            Collidable._collidableIDs = 0;
            Collidable.prototype.IsCollidingWith = function (other) {
                return this.Bounds.Intersects(other.Bounds);
            };
            Collidable.prototype.Collided = function (data) {
                this.OnCollision.Trigger(data);
            };
            Collidable.prototype.Dispose = function () {
                if(!this._disposed) {
                    this._disposed = true;
                    this.OnDisposed.Trigger(this);
                } else {
                    throw new Error("Cannot dispose collidable twice.");
                }
            };
            return Collidable;
        })();
        Collision.Collidable = Collidable;        
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Collidable.js.map
