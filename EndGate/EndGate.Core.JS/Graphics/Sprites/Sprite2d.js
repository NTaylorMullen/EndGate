var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="ImageSource.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable sprite.  Sprites are used to draw images to the game screen.
        */
        var Sprite2d = (function (_super) {
            __extends(Sprite2d, _super);
            function Sprite2d(x, y, image, width, height) {
                if (typeof width === "undefined") { width = image.ClipSize.Width; }
                if (typeof height === "undefined") { height = image.ClipSize.Height; }
                _super.call(this, new eg.Vector2d(x, y));
                this._type = "Sprite2d";

                this.Image = image;
                this.Size = new eg.Size2d(width, height);
            }
            Sprite2d.prototype.Opacity = function (alpha) {
                return this._State.GlobalAlpha(alpha);
            };

            /**
            * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the sprite onto.
            */
            Sprite2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth, -this.Size.HalfHeight, this.Size.Width, this.Size.Height);

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the Sprite2d will draw.
            */
            Sprite2d.prototype.GetDrawBounds = function () {
                var bounds = new eg.Bounds.BoundingRectangle(this.Position, this.Size);

                bounds.Rotation = this.Rotation;

                return bounds;
            };
            return Sprite2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Sprite2d = Sprite2d;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
