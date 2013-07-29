var EndGate;
(function (EndGate) {
    /// <reference path="../Interfaces/IMoveable.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference  path="BoundingRectangle.ts" />
    /// <reference  path="BoundingCircle.ts" />
    (function (Bounds) {
        /**
        * Abstract bounds type that is used to detect intersections.
        */
        var Bounds2d = (function () {
            function Bounds2d(position, rotation) {
                this._boundsType = "Bounds2d";
                this.Position = position;
                this.Rotation = rotation || 0;
            }
            /**
            * Abstract: Scales the size of the bounded object.
            * @param x Value to multiply the horizontal component by.
            * @param y Value to multiply the vertical component by.
            */
            Bounds2d.prototype.Scale = function (x, y) {
                throw new Error("This method is abstract!");
            };

            /**
            * Abstract: Determines if the current bounded object contains the provided Vector2d.
            * @param point A point.
            */
            Bounds2d.prototype.ContainsPoint = function (point) {
                throw new Error("This method is abstract!");
            };

            /**
            * Abstract: Determines if the current bounded object completely contains the provided BoundingCircle.
            * @param point A circle to check containment on.
            */
            Bounds2d.prototype.ContainsCircle = function (circle) {
                throw new Error("This method is abstract!");
            };

            /**
            * Abstract: Determines if the current bounded object completely contains the provided BoundingRectangle.
            * @param point A rectangle to check containment on.
            */
            Bounds2d.prototype.ContainsRectangle = function (rectangle) {
                throw new Error("This method is abstract!");
            };

            Bounds2d.prototype.Contains = function (obj) {
                if (obj._boundsType === "BoundingCircle") {
                    return this.ContainsCircle(obj);
                } else if (obj._boundsType === "BoundingRectangle") {
                    return this.ContainsRectangle(obj);
                } else if (obj._type === "Vector2d") {
                    return this.ContainsPoint(obj);
                } else {
                    throw new Error("Cannot try and check contains with an unidentifiable object, must be a Vector2d, BoundingCircle or BoundingRectangle.");
                }
            };

            Bounds2d.prototype.Intersects = function (obj) {
                if (obj._boundsType === "BoundingCircle") {
                    return this.IntersectsCircle(obj);
                } else if (obj._boundsType === "BoundingRectangle") {
                    return this.IntersectsRectangle(obj);
                } else {
                    throw new Error("Cannot intersect with unidentifiable object, must be BoundingCircle or BoundingRectangle.");
                }
            };

            /**
            * Abstract: Determines if the current bounded object is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            Bounds2d.prototype.IntersectsCircle = function (circle) {
                throw new Error("This method is abstract!");
            };

            /**
            * Abstract: Determines if the current bounded object is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            Bounds2d.prototype.IntersectsRectangle = function (rectangle) {
                throw new Error("This method is abstract!");
            };
            return Bounds2d;
        })();
        Bounds.Bounds2d = Bounds2d;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
