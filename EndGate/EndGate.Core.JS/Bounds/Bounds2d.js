var EndGate;
(function (EndGate) {
    (function (Bounds) {
        /// <reference path="../Interfaces/IMoveable.ts" />
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference  path="BoundingRectangle.ts" />
        /// <reference  path="BoundingCircle.ts" />
        (function (Abstractions) {
            /**
            * Abstract bounds type that is used to detect intersections.
            */
            var Bounds2d = (function () {
                function Bounds2d(position, rotation) {
                    this._boundsType = "Bounds2d";
                    this.Position = position;
                    this.Rotation = rotation || 0;
                }
                Bounds2d.prototype.Scale = /**
                * Abstract: Scales the size of the bounded object.
                * @param x Value to multiply the horizontal component by.
                * @param y Value to multiply the vertical component by.
                */
                function (x, y) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.ContainsPoint = /**
                * Abstract: Determines if the current bounded object contains the provided Vector2d.
                * @param point A point.
                */
                function (point) {
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
                Bounds2d.prototype.IntersectsCircle = /**
                * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
                * @param circle BoundingCircle to check intersection with.
                */
                function (circle) {
                    throw new Error("This method is abstract!");
                };
                Bounds2d.prototype.IntersectsRectangle = /**
                * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
                * @param rectangle BoundingRectangle to check intersection with.
                */
                function (rectangle) {
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
