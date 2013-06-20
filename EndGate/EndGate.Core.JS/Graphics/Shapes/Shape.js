var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
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

                    if (typeof color !== "undefined") {
                        this.Color(color);
                    }
                }
                Shape.prototype.Color = function (color) {
                    this._fill = true;
                    return this._State.FillStyle(color);
                };

                /**
                * Sets the current borders thickness and color.
                * @param thickness The new border thickness in pixels.
                * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
                */
                Shape.prototype.Border = function (thickness, color) {
                    this.BorderThickness(thickness);
                    this.BorderColor(color);
                };

                Shape.prototype.BorderThickness = function (thickness) {
                    return this._State.LineWidth(thickness);
                };

                Shape.prototype.BorderColor = function (color) {
                    this._stroke = true;
                    return this._State.StrokeStyle(color);
                };

                Shape.prototype.Shadow = function (x, y, color, blur) {
                    this.ShadowX(x);
                    this.ShadowY(y);
                    this.ShadowColor(color);
                    this.ShadowBlur(blur);
                };

                Shape.prototype.ShadowColor = function (color) {
                    this._fill = true;
                    return this._State.ShadowColor(color);
                };

                Shape.prototype.ShadowX = function (x) {
                    return this._State.ShadowOffsetX(x);
                };

                Shape.prototype.ShadowY = function (y) {
                    return this._State.ShadowOffsetY(y);
                };

                Shape.prototype.ShadowBlur = function (blur) {
                    return this._State.ShadowBlur(blur);
                };

                Shape.prototype.Opacity = function (alpha) {
                    return this._State.GlobalAlpha(alpha);
                };

                Shape.prototype._StartDraw = function (context) {
                    _super.prototype._StartDraw.call(this, context);
                    context.beginPath();
                };

                Shape.prototype._EndDraw = function (context) {
                    if (this._fill) {
                        context.fill();
                    }

                    if (this._stroke) {
                        context.stroke();
                    } else {
                        context.closePath();
                    }

                    _super.prototype._EndDraw.call(this, context);
                };

                // This should be overridden if you want to build a proper shape
                Shape.prototype._BuildPath = function (context) {
                };

                /**
                * Draws the shape onto the given context.  If this shape is part of a scene the Draw function will be called automatically.
                * @param context The canvas context to draw the shape onto.
                */
                Shape.prototype.Draw = function (context) {
                    this._StartDraw(context);
                    this._BuildPath(context);
                    this._EndDraw(context);
                };
                return Shape;
            })(Abstractions.Graphic2d);
            Abstractions.Shape = Shape;
        })(Graphics.Abstractions || (Graphics.Abstractions = {}));
        var Abstractions = Graphics.Abstractions;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
