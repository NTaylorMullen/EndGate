var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Abstractions) {
            var Shape = (function (_super) {
                __extends(Shape, _super);
                function Shape(position, color) {
                                _super.call(this, position);
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
                Shape.prototype.Border = function (thickness, color) {
                    return [
                        this.BorderThickness(thickness), 
                        this.BorderColor(color)
                    ];
                };
                Shape.prototype.BorderThickness = function (thickness) {
                    return this.State.LineWidth(thickness);
                };
                Shape.prototype.BorderColor = function (color) {
                    this._stroke = true;
                    return this.State.StrokeStyle(color);
                };
                Shape.prototype.Shadow = function (x, y, color, blur) {
                    return [
                        this.ShadowX(x), 
                        this.ShadowY(y), 
                        this.ShadowColor(color), 
                        this.ShadowBlur(blur)
                    ];
                };
                Shape.prototype.ShadowColor = function (color) {
                    this._fill = true;
                    return this.State.ShadowColor(color);
                };
                Shape.prototype.ShadowX = function (val) {
                    return this.State.ShadowOffsetX(val);
                };
                Shape.prototype.ShadowY = function (val) {
                    return this.State.ShadowOffsetY(val);
                };
                Shape.prototype.ShadowBlur = function (val) {
                    return this.State.ShadowBlur(val);
                };
                Shape.prototype.Opacity = function (alpha) {
                    return this.State.GlobalAlpha(alpha);
                };
                Shape.prototype.StartDraw = function (context) {
                    context.beginPath();
                    _super.prototype.StartDraw.call(this, context);
                };
                Shape.prototype.EndDraw = function (context) {
                    if(this._fill) {
                        context.fill();
                    }
                    if(this._stroke) {
                        context.stroke();
                    } else {
                        context.closePath();
                    }
                    _super.prototype.EndDraw.call(this, context);
                };
                Shape.prototype.BuildPath = function (context) {
                };
                Shape.prototype.Draw = function (context) {
                    this.StartDraw(context);
                    this.BuildPath(context);
                    this.EndDraw(context);
                };
                return Shape;
            })(Abstractions.Graphic2d);
            Abstractions.Shape = Shape;            
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Shape.js.map
