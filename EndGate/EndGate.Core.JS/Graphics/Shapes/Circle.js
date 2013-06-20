var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingCircle.ts" />
    /// <reference path="Shape.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable circle.
        */
        var Circle = (function (_super) {
            __extends(Circle, _super);
            function Circle(x, y, radius, color) {
                _super.call(this, new eg.Vector2d(x, y), color);
                this._type = "Circle";

                this.Radius = radius;
            }
            /**
            * The bounding area that represents where the Circle will draw.
            */
            Circle.prototype.GetDrawBounds = function () {
                var bounds = new eg.Bounds.BoundingCircle(this.Position, this.Radius);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            Circle.prototype._BuildPath = function (context) {
                context.arc(0, 0, this.Radius, 0, (Math).twoPI);
            };
            return Circle;
        })(Graphics.Abstractions.Shape);
        Graphics.Circle = Circle;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
