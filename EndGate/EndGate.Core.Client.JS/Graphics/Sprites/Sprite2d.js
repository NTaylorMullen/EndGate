var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Sprites) {
                var Sprite2d = (function (_super) {
                    __extends(Sprite2d, _super);
                    function Sprite2d(x, y, image, width, height) {
                        if (typeof width === "undefined") { width = image.ClipSize.Width; }
                        if (typeof height === "undefined") { height = image.ClipSize.Height; }
                                        _super.call(this, new Core.Assets.Vector2d(x, y));
                        this._type = "Sprite2d";
                        this.Image = image;
                        this.Size = new Core.Assets.Size2d(width, height);
                    }
                    Sprite2d.prototype.Opacity = function (alpha) {
                        return this.State.GlobalAlpha(alpha);
                    };
                    Sprite2d.prototype.Draw = function (context) {
                        _super.prototype.StartDraw.call(this, context);
                        context.drawImage(this.Image.Source, this.Image.ClipLocation.X, this.Image.ClipLocation.Y, this.Image.ClipSize.Width, this.Image.ClipSize.Height, this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
                        _super.prototype.EndDraw.call(this, context);
                    };
                    Sprite2d.prototype.GetDrawBounds = function () {
                        var bounds = new Core.BoundingObject.BoundingRectangle(this.Position, this.Image.Size);
                        bounds.Rotation = this.Rotation;
                        return bounds;
                    };
                    return Sprite2d;
                })(Graphics.Graphic2d);
                Sprites.Sprite2d = Sprite2d;                
            })(Graphics.Sprites || (Graphics.Sprites = {}));
            var Sprites = Graphics.Sprites;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Sprite2d.js.map
