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
                                        _super.call(this, new Core.Assets.Vector2d(x, y), new Core.Assets.Size2d(radius * 2, radius * 2), color);
                        this._type = "Circle";
                        this._radius = radius;
                    }
                    Circle.prototype.Radius = function (val) {
                        if(typeof val !== "undefined") {
                            this._radius = val;
                            this.Size.Width = this.Size.Height = val * 2;
                        }
                        return this._radius;
                    };
                    Circle.prototype.Draw = function (context) {
                        this.SyncSize();
                        _super.prototype.Draw.call(this, context);
                    };
                    Circle.prototype.BuildPath = function (context) {
                        context.arc(this.Position.X, this.Position.Y, this._radius, 0, Math.twoPI);
                    };
                    Circle.prototype.SyncSize = function () {
                        var circumfrence = this._radius * 2;
                        if(circumfrence !== this.Size.Width) {
                            this.Radius(this.Size.Width / 2);
                        } else if(circumfrence !== this.Size.Height) {
                            this.Radius(this.Size.Height / 2);
                        }
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
