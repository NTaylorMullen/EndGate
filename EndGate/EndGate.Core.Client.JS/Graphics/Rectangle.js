var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            var Assets = EndGate.Core.Assets;
            var Rectangle = (function (_super) {
                __extends(Rectangle, _super);
                function Rectangle(x, y, width, height) {
                                _super.call(this, new Assets.Vector2d(x, y), new Assets.Size2d(width, height));
                    this._type = "Rectangle";
                }
                Rectangle.prototype.Color = function (color) {
                    return this.State.FillStyle(color);
                };
                Rectangle.prototype.Draw = function (context) {
                    this.StartDraw(context);
                    context.fillRect(this.Position.X, this.Position.Y, this.Size.Width, this.Size.Height);
                    this.EndDraw(context);
                };
                return Rectangle;
            })(Graphics.Graphic2d);
            Graphics.Rectangle = Rectangle;            
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
