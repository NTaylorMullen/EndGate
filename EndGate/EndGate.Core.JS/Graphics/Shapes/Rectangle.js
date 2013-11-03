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
                _super.call(this, new PIXI.Graphics(), new EndGate.Vector2d(x, y), color);
                this._type = "Rectangle";

                this._size = EndGate.Size2d.Zero;
                this.Size = new EndGate.Size2d(width, height);
            }
            Object.defineProperty(Rectangle.prototype, "Size", {
                get: /**
                * Gets or sets the Size of the Rectangle.
                */
                function () {
                    return this._size;
                },
                set: function (size) {
                    var _this = this;
                    var previousWidth = this._size.Width, previousHeight = this._size.Height;

                    // Delete the old size to remove any property bindings on the Size2d
                    delete this._size.Width;
                    delete this._size.Height;

                    // Reset the size to its previous values (the monitor should not be applying now)
                    this._size.Width = previousWidth;
                    this._size.Height = previousHeight;

                    this._size = size;
                    this._proxyWidth = size.Width;
                    this._proxyHeight = size.Height;

                    // If our Size changes we need to update the underlying PIXI object to match
                    this._MonitorProperty(size, "Width", function () {
                        return _this._proxyWidth;
                    }, function (width) {
                        _this._proxyWidth = width;
                        _this._BuildGraphic();
                    });

                    this._MonitorProperty(size, "Height", function () {
                        return _this._proxyHeight;
                    }, function (height) {
                        _this._proxyHeight = height;
                        _this._BuildGraphic();
                    });

                    this._BuildGraphic();
                },
                enumerable: true,
                configurable: true
            });

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

            Rectangle.prototype._BuildGraphic = function () {
                if (this.Size) {
                    this._StartBuildGraphic();
                    this.PixiBase.drawRect(-this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);
                    this._EndBuildGraphic();
                }
            };
            return Rectangle;
        })(EndGate.Graphics.Shape);
        Graphics.Rectangle = Rectangle;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
