/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../ImageSource.ts" />
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
        * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
        */
        var Sprite2d = (function (_super) {
            __extends(Sprite2d, _super);
            function Sprite2d(x, y, image, width, height) {
                if (typeof width === "undefined") { width = image.ClipSize.Width; }
                if (typeof height === "undefined") { height = image.ClipSize.Height; }
                var _this = this;
                _super.call(this, new PIXI.Sprite(image.Source), new EndGate.Vector2d(x, y));
                this._type = "Sprite2d";

                this.Image = image;
                this.Size = new EndGate.Size2d(width, height);
                this.PixiBase.anchor.x = this.PixiBase.anchor.y = .5;

                this._MonitorProperty(this.PixiBase, "width", function () {
                    return _this.Size.Width;
                }, function (width) {
                    _this.Size.Width = width;
                });

                this._MonitorProperty(this.PixiBase, "height", function () {
                    _this.Size.Height = height;
                }, function (height) {
                    _this.Size.Height = height;
                });
            }
            /**
            * The bounding area that represents where the Sprite2d will draw.
            */
            Sprite2d.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };

            /**
            * Scale's the Sprite2d graphic.
            * @param scale The value to multiply the graphic's size by.
            */
            Sprite2d.prototype.Scale = function (scale) {
                this.Size.Width *= scale;
                this.Size.Height *= scale;
            };

            /**
            * Returns a nearly identical copy of this Sprite2d.  If this Sprite2d belongs to a parent, the cloned Sprite2d will not. If this Sprite2d has children, all children will be cloned as well.  Lastly, the cloned Sprite2d will not have the same event bindings as this one does.
            */
            Sprite2d.prototype.Clone = function () {
                var graphic = new Sprite2d(this.Position.X, this.Position.Y, this.Image.Clone(), this.Size.Width, this.Size.Height);

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };
            return Sprite2d;
        })(EndGate.Graphics.Graphic2d);
        Graphics.Sprite2d = Sprite2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
