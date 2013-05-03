var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Rectangle = (function (_super) {
            __extends(Rectangle, _super);
            function Rectangle(x, y, width, height, color) {
                        _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Rectangle";
                this.Size = new EndGate.Size2d(width, height);
            }
            Rectangle.prototype.BuildPath = function (context) {
                context.rect(-this.Size.HalfWidth(), -this.Size.HalfHeight(), this.Size.Width, this.Size.Height);
            };
            Rectangle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, this.Size);
                bounds.Rotation = this.Rotation;
                return bounds;
            };
            return Rectangle;
        })(Graphics.Abstractions.Shape);
        Graphics.Rectangle = Rectangle;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Rectangle.js.map
