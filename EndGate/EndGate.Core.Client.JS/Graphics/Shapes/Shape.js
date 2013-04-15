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
                var Shape = (function (_super) {
                    __extends(Shape, _super);
                    function Shape(position, size, color) {
                                        _super.call(this, position, size);
                        this._type = "Shape";
                        this._fill = false;
                        this._stroke = false;
                        if(typeof color !== "undefined") {
                            this.Color(color);
                        }
                    }
                    Shape.prototype.Color = function (color) {
                        this._fill = true;
                        return this.State.FillStyle(color);
                    };
                    Shape.prototype.BorderColor = function (color) {
                        this._stroke = true;
                        return this.State.StrokeStyle(color);
                    };
                    Shape.prototype.BorderThickness = function (thickness) {
                        return this.State.LineWidth(thickness);
                    };
                    Shape.prototype.Opacity = function (alpha) {
                        return this.State.GlobalAlpha(alpha);
                    };
                    Shape.prototype.StartDraw = function (context) {
                        if(this._stroke) {
                            context.beginPath();
                        }
                        _super.prototype.StartDraw.call(this, context);
                    };
                    Shape.prototype.EndDraw = function (context) {
                        if(this._fill) {
                            context.fill();
                        }
                        if(this._stroke) {
                            context.stroke();
                            context.closePath();
                        }
                        _super.prototype.EndDraw.call(this, context);
                    };
                    return Shape;
                })(Graphics.Graphic2d);
                Shapes.Shape = Shape;                
            })(Graphics.Shapes || (Graphics.Shapes = {}));
            var Shapes = Graphics.Shapes;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Shape.js.map
