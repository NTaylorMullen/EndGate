var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var Collidable = (function () {
                function Collidable(bounds) {
                    this._type = "Collidable";
                    this._disposed = false;
                    this.Bounds = bounds;
                    this.ID = Collidable._collidableIDs++;
                    this.OnCollision = new Core.Utilities.EventHandler();
                    this.OnDisposed = new Core.Utilities.EventHandler();
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
        })(Core.Collision || (Core.Collision = {}));
        var Collision = Core.Collision;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Collidable.js.map
