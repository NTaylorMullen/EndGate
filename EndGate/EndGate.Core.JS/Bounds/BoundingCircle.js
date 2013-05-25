var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
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
            * @param position Initial position of BoundingCircle.
            * @param radius Initial radius of the BoundingCircle.
            */
            function BoundingCircle(position, radius) {
                        _super.call(this, position);
                this._type = "BoundingCircle";
                this._boundsType = "BoundingCircle";
                this.Radius = radius;
                var foo = new BoundingCircle(EndGate.Vector2d.Zero(), 3);
            }
            BoundingCircle.prototype.Scale = /**
            * Scales the radius of the BoundingCircle.
            * @param scale Value to multiply the radius by.
            */
            function (scale) {
                this.Radius *= scale;
            };
            BoundingCircle.prototype.Area = /**
            * Calculates the area of the BoundingCircle.
            */
            function () {
                return Math.PI * this.Radius * this.Radius;
            };
            BoundingCircle.prototype.Circumference = /**
            * Calculates the circumference of the BoundingCircle.
            */
            function () {
                return 2 * Math.PI * this.Radius;
            };
            BoundingCircle.prototype.IntersectsCircle = /**
            * Determines if the current BoundingCircle is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            function (circle) {
                return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
            };
            BoundingCircle.prototype.IntersectsRectangle = /**
            * Determines if the current BoundingCircle is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            function (rectangle) {
                var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, -rectangle.Rotation);
                var circleDistance = translated.Distance(rectangle.Position);
                if(circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) {
                    return false;
                }
                if(circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) {
                    return false;
                }
                if(circleDistance.X <= (rectangle.Size.HalfWidth())) {
                    return true;
                }
                if(circleDistance.Y <= (rectangle.Size.HalfHeight())) {
                    return true;
                }
                var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);
                return (cornerDistance_sq <= (this.Radius * this.Radius));
            };
            BoundingCircle.prototype.ContainsPoint = /**
            * Determines if the current BoundingCircle contains the provided Vector2d.
            * @param point A point.
            */
            function (point) {
                return this.Position.Distance(point).Magnitude() < this.Radius;
            };
            return BoundingCircle;
        })(Bounds.Abstractions.Bounds2d);
        Bounds.BoundingCircle = BoundingCircle;        
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
