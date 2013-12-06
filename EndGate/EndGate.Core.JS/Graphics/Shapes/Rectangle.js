/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Bounds/BoundingRectangle.ts" />
/// <reference path="../Color.ts" />
/// <reference path="Shape.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /**
        * Defines a drawable rectangle.
        */
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height, color) {
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Rectangle";

                this.Size = new EndGate.Size2d(width, height);
            }
            /**
            * The bounding area that represents where the Rectangle will draw.
            */
            Rectangle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            /**
            * Scale's the rectangle graphic.
            * @param scale The value to multiply the graphic's size by.
            */
            Rectangle.prototype.Scale = function (scale) {
                this.Size.Width *= scale;
                this.Size.Height *= scale;
            };

            /**
            * Returns a nearly identical copy of this Rectangle.  If this Rectangle belongs to a parent, the cloned Rectangle will not. If this Rectangle has children, all children will be cloned as well.  Lastly, the cloned Rectangle will not have the same event bindings as this one does.
            */
            Rectangle.prototype.Clone = function () {
                var graphic = new Rectangle(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height, this.Color.Clone());

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Rectangle.prototype._BuildPath = function (context) {
                context.rect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
            };
            return Rectangle;
        })(EndGate.Graphics.Shape);
        Graphics.Rectangle = Rectangle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
