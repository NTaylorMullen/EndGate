var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /// <reference path="../../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../Graphic2d.ts" />
        (function (Abstractions) {
            /**
            * Abstract drawable shape type that is used create customizable drawable graphics.
            */
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
                Shape.prototype.Border = /**
                * Sets the current borders thickness and color.
                * @param thickness The new border thickness in pixels.
                * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
                */
                function (thickness, color) {
                    this.BorderThickness(thickness);
                    this.BorderColor(color);
                };
                Shape.prototype.BorderThickness = function (thickness) {
                    return this.State.LineWidth(thickness);
                };
                Shape.prototype.BorderColor = function (color) {
                    this._stroke = true;
                    return this.State.StrokeStyle(color);
                };
                Shape.prototype.Shadow = function (x, y, color, blur) {
                    this.ShadowX(x);
                    this.ShadowY(y);
                    this.ShadowColor(color);
                    this.ShadowBlur(blur);
                };
                Shape.prototype.ShadowColor = function (color) {
                    this._fill = true;
                    return this.State.ShadowColor(color);
                };
                Shape.prototype.ShadowX = function (x) {
                    return this.State.ShadowOffsetX(x);
                };
                Shape.prototype.ShadowY = function (y) {
                    return this.State.ShadowOffsetY(y);
                };
                Shape.prototype.ShadowBlur = function (blur) {
                    return this.State.ShadowBlur(blur);
                };
                Shape.prototype.Opacity = function (alpha) {
                    return this.State.GlobalAlpha(alpha);
                };
                Shape.prototype._StartDraw = function (context) {
                    context.beginPath();
                    _super.prototype._StartDraw.call(this, context);
                };
                Shape.prototype._EndDraw = function (context) {
                    if(this._fill) {
                        context.fill();
                    }
                    if(this._stroke) {
                        context.stroke();
                    } else {
                        context.closePath();
                    }
                    _super.prototype._EndDraw.call(this, context);
                };
                Shape.prototype._BuildPath = // This should be overridden if you want to build a proper shape
                function (context) {
                };
                Shape.prototype.Draw = /**
                * Draws the shape onto the given context.  If this grid is part of a scene the Draw function will be called automatically.
                * @param context The canvas context to draw the grid onto.
                */
                function (context) {
                    // You can override this Draw if you want to implement your own logic for applying styles and drawing (do not recommend overriding)
                    this._StartDraw(context);
                    this._BuildPath(context);
                    this._EndDraw(context);
                };
                return Shape;
            })(Abstractions.Graphic2d);
            Abstractions.Shape = Shape;            
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
