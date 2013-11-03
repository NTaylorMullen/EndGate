var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingCircle.ts" />
    /// <reference path="../Color.ts" />
    /// <reference path="Shape.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable circle.
        */
        var Circle = (function (_super) {
            __extends(Circle, _super);
            function Circle(x, y, radius, color) {
                _super.call(this, new PIXI.Graphics(), new EndGate.Vector2d(x, y), color);
                this._type = "Circle";

                this.Radius = radius;
            }
            Object.defineProperty(Circle.prototype, "Radius", {
                get: /**
                * Gets or sets the Radius of the Circle.
                */
                function () {
                    return this._radius;
                },
                set: function (radius) {
                    this._radius = radius;
                    this._BuildGraphic();
                },
                enumerable: true,
                configurable: true
            });

            /**
            * The bounding area that represents where the Circle will draw.
            */
            Circle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.Radius);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            /**
            * Scale's the circle graphic.
            * @param scale The value to multiply the graphic's size by.
            */
            Circle.prototype.Scale = function (scale) {
                this.Radius *= scale;
            };

            /**
            * Returns a nearly identical copy of this Circle.  If this Circle belongs to a parent, the cloned Circle will not. If this Circle has children, all children will be cloned as well.  Lastly, the cloned Circle will not have the same event bindings as this one does.
            */
            Circle.prototype.Clone = function () {
                var graphic = new Circle(this.Position.X, this.Position.Y, this.Radius, this.Color.Clone());

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Circle.prototype._BuildGraphic = function () {
                if (typeof this._radius !== "undefined") {
                    this._StartBuildGraphic();
                    this.PixiBase.drawCircle(0, 0, this.Radius);
                    this._EndBuildGraphic();
                }
            };
            return Circle;
        })(Graphics.Shape);
        Graphics.Circle = Circle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
