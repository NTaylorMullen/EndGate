var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var Collidable = (function () {
                function Collidable(bounds) {
                    this._type = "Collidable";
                    this._boundsType = "Collidable";
                    for(var property in bounds) {
                        this[property] = bounds[property];
                    }
                    this._disposed = false;
                    this.ID = Collidable._collidableIDs++;
                    this.OnCollision = new Core.Utilities.EventHandler();
                    this.OnDisposed = new Core.Utilities.EventHandler();
                }
                Collidable._collidableIDs = 0;
                Collidable.prototype.IsCollidingWith = function (other) {
                    return this.Intersects(other);
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
                Collidable.prototype.ContainsPoint = function (point) {
                    throw new Error("This method is abstract!");
                };
                Collidable.prototype.Intersects = function (obj) {
                    if(obj._type === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if(obj._type === "BoundingRectangle") {
                        return this.IntersectsRectangle(obj);
                    } else {
                        throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
                    }
                };
                Collidable.prototype.IntersectsCircle = function (circle) {
                    throw new Error("This method is abstract!");
                };
                Collidable.prototype.IntersectsRectangle = function (rectangle) {
                    throw new Error("This method is abstract!");
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
