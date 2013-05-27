var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
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
                        _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Sprite2d";
                this.Image = image;
                this.Size = new EndGate.Size2d(width, height);
            }
            Sprite2d.prototype.Opacity = function (alpha) {
                return this.State.GlobalAlpha(alpha);
            };
            Sprite2d.prototype.Draw = /**
            * Draws the sprite onto the given context.  If this sprite is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the sprite onto.
            */
            function (context) {
                _super.prototype._StartDraw.call(this, context);
                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
                _super.prototype._EndDraw.call(this, context);
            };
            Sprite2d.prototype.GetDrawBounds = /**
            * The bounding area that represents where the Sprite2d will draw.
            */
            function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);
                bounds.Rotation = this.Rotation;
                return bounds;
            };
            return Sprite2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Sprite2d = Sprite2d;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
