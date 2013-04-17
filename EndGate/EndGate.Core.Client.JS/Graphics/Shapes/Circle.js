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
                var Circle = (function (_super) {
                    __extends(Circle, _super);
                    function Circle(x, y, radius, color) {
                                        _super.call(this, new Core.BoundingObject.BoundingCircle(new Core.Assets.Vector2d(x, y), radius), color);
                        this._type = "Circle";
                    }
                    Circle.prototype.BuildPath = function (context) {
                        context.arc(this.Position.X, this.Position.Y, this.Radius, 0, (Math).twoPI);
                    };
                    return Circle;
                })(Shapes.Shape);
                Shapes.Circle = Circle;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Circle.js.map
