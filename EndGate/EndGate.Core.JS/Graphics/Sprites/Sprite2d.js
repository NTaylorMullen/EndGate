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
            Sprite2d.prototype.Draw = function (context) {
                _super.prototype.StartDraw.call(this, context);
                context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, -this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
                _super.prototype.EndDraw.call(this, context);
            };
            Sprite2d.prototype.GetDrawBounds = function () {
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
//@ sourceMappingURL=Sprite2d.js.map
