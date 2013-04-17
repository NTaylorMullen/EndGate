var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Shapes) {
                var Rectangle = (function (_super) {
                    __extends(Rectangle, _super);
                    function Rectangle(x, y, width, height, color) {
                                        _super.call(this, new Core.BoundingObject.BoundingRectangle(new Core.Assets.Vector2d(x, y), new Core.Assets.Size2d(width, height)), color);
                        this._type = "Rectangle";
                        this.Size = (this.Bounds).Size;
                    }
                    Rectangle.prototype.BuildPath = function (context) {
                        context.rect(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
                    };
                    return Rectangle;
                })(Shapes.Shape);
                Shapes.Rectangle = Rectangle;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Rectangle.js.map
