var EndGate;
(function (EndGate) {
    (function (Bounds) {
        (function (Abstractions) {
            var Bounds2d = (function () {
                function Bounds2d(position) {
                    this._boundsType = "Bounds2d";
                    this.Position = position;
                    this.Rotation = 0;
                }
                Bounds2d.prototype.Scale = function (x, y) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.ContainsPoint = function (point) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.Intersects = function (obj) {
                    if(obj._boundsType === "BoundingCircle") {
                        return this.IntersectsCircle(obj);
                    } else if(obj._boundsType === "BoundingRectangle") {
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
            Abstractions.Bounds2d = Bounds2d;            
        })(Bounds.Abstractions || (Bounds.Abstractions = {}));
        var Abstractions = Bounds.Abstractions;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Bounds2d.js.map
