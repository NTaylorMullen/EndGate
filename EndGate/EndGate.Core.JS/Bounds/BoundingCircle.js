var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="BoundingRectangle.ts" />
    /// <reference path="Bounds2d.ts" />
    (function (Bounds) {
        /**
        * Defines a circle that can be used to detect intersections.
        */
        var BoundingCircle = (function (_super) {
            __extends(BoundingCircle, _super);
            /**
            * Creates a new instance of BoundingCircle.
            * @param position Initial Position of the BoundingCircle.
            * @param radius Initial Radius of the BoundingCircle.
            */
            function BoundingCircle(position, radius) {
                _super.call(this, position);
                this._type = "BoundingCircle";
                this._boundsType = "BoundingCircle";

                this.Radius = radius;
            }
            /**
            * Scales the radius of the BoundingCircle.
            * @param scale Value to multiply the radius by.
            */
            BoundingCircle.prototype.Scale = function (scale) {
                // This is an overloaded version of Bounds2d Scale but we don't care
                // about the second parameter within a BoundingCircle
                this.Radius *= scale;
            };

            /**
            * Calculates the area of the BoundingCircle.
            */
            BoundingCircle.prototype.Area = function () {
                return Math.PI * this.Radius * this.Radius;
            };

            /**
            * Calculates the circumference of the BoundingCircle.
            */
            BoundingCircle.prototype.Circumference = function () {
                return 2 * Math.PI * this.Radius;
            };

            /**
            * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            BoundingCircle.prototype.IntersectsCircle = function (circle) {
                return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
            };

            /**
            * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
                var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);

                var circleDistance = translated.Distance(rectangle.Position);

                if (circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) {
                    return false;
                }
                if (circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) {
                    return false;
                }

                if (circleDistance.X <= (rectangle.Size.HalfWidth())) {
                    return true;
                }
                if (circleDistance.Y <= (rectangle.Size.HalfHeight())) {
                    return true;
                }

                var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);

                return (cornerDistance_sq <= (this.Radius * this.Radius));
            };

            /**
            * Determines if the current BoundingCircle contains the provided Vector2d.
            * @param point A point.
            */
            BoundingCircle.prototype.ContainsPoint = function (point) {
                return this.Position.Distance(point).Magnitude() < this.Radius;
            };
            return BoundingCircle;
        })(Bounds.Abstractions.Bounds2d);
        Bounds.BoundingCircle = BoundingCircle;
    })(eg.Bounds || (eg.Bounds = {}));
    var Bounds = eg.Bounds;
})(eg || (eg = {}));
