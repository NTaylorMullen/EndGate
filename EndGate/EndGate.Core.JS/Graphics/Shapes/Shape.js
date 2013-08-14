var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="../Color.ts" />
    (function (Graphics) {
        /**
        * Abstract drawable shape type that is used create customizable drawable graphics.
        */
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape(position, color) {
                _super.call(this, position);
                this._type = "Shape";

                this._fill = false;

                if (typeof color !== "undefined") {
                    this.Color = color;
                }
            }
            Object.defineProperty(Shape.prototype, "Color", {
                get: /**
                * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._fillStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }
                    this._fill = true;
                    this._fillStyle = color;
                    this._State.FillStyle = color.toString();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderThickness", {
                get: /**
                * Gets or sets the current border thickness.
                */
                function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderColor", {
                get: /**
                * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._strokeStyle;
                },
                set: function (color) {
                    this._strokeStyle = color;
                    this._State.StrokeStyle = color.toString();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowColor", {
                get: /**
                * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._shadowColor;
                },
                set: function (color) {
                    this._fill = true;
                    this._shadowColor = color;
                    this._State.ShadowColor = color.toString();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowX", {
                get: /**
                * Gets or sets the current horizontal shadow position.
                */
                function () {
                    return this._State.ShadowOffsetX;
                },
                set: function (x) {
                    this._State.ShadowOffsetX = x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowY", {
                get: /**
                * Gets or sets the current vertical shadow position.
                */
                function () {
                    return this._State.ShadowOffsetY;
                },
                set: function (y) {
                    this._State.ShadowOffsetY = y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowBlur", {
                get: /**
                * Gets or sets the current shadow blur.
                */
                function () {
                    return this._State.ShadowBlur;
                },
                set: function (blur) {
                    this._State.ShadowBlur = blur;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Sets the current borders thickness and color.
            * @param thickness The new border thickness in pixels.
            * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
            */
            Shape.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            Shape.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX = x;
                this.ShadowY = y;
                this.ShadowColor = color;
                this.ShadowBlur = blur;
            };

            Shape.prototype._StartDraw = function (context) {
                _super.prototype._StartDraw.call(this, context);
                context.beginPath();
            };

            Shape.prototype._EndDraw = function (context) {
                if (this._fill) {
                    context.fill();
                }

                if (this._State.LineWidth > 0) {
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

            Shape.prototype._Clone = function (graphic) {
                graphic.Border(this.BorderThickness, this.BorderColor.Clone());
                graphic.Shadow(this.ShadowX, this.ShadowY, this.ShadowColor.Clone(), this.ShadowBlur);

                _super.prototype._Clone.call(this, graphic);
            };
            return Shape;
        })(Graphics.Graphic2d);
        Graphics.Shape = Shape;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
