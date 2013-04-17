var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var Bounds2d = (function () {
                function Bounds2d(position) {
                    this.Position = position;
                    this.Rotation = 0;
                }
                Bounds2d.prototype.ContainsPoint = function (point) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.Intersects = function (obj) {
                    if(obj._type === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if(obj._type === "BoundingRectangle") {
                        return this.IntersectsRectangle(obj);
                    } else {
                        throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle");
                    }
                };
                Bounds2d.prototype.IntersectsCircle = function (circle) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
                    throw new Error("This method is abstract!");
                };
                return Bounds2d;
            })();
            BoundingObject.Bounds2d = Bounds2d;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Bounds2d.js.map
