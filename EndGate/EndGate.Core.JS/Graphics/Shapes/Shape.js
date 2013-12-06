/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Graphic2d.ts" />
/// <reference path="../Color.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /**
        * Abstract drawable shape type that is used create customizable drawable graphics.
        */
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape(position, color) {
                var _this = this;
                _super.call(this, position);
                this._type = "Shape";

                this._fillChangeWire = function (color) {
                    _this._State.FillStyle = color.toString();
                };

                this._strokeChangeWire = function (color) {
                    _this._State.StrokeStyle = color.toString();
                };

                this._shadowChangeWire = function (color) {
                    _this._State.ShadowColor = color.toString();
                };

                this.ShadowColor = this._shadowColor = EndGate.Graphics.Color.Black;
                this.BorderColor = this._strokeStyle = EndGate.Graphics.Color.Black;

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new EndGate.Graphics.Color(color);
                    }

                    this.Color = this._fillStyle = color;
                } else {
                    this.Color = this._fillStyle = EndGate.Graphics.Color.Black;
                }
            }
            Object.defineProperty(Shape.prototype, "Color", {
                /**
                * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                get: function () {
                    return this._fillStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new EndGate.Graphics.Color(color);
                    }

                    // Unbind old
                    this._fillStyle.OnChange.Unbind(this._fillChangeWire);
                    this._fillStyle = color;

                    // Bind new
                    this._fillStyle.OnChange.Bind(this._fillChangeWire);

                    // Update state
                    this._fillChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderThickness", {
                /**
                * Gets or sets the current border thickness.
                */
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderColor", {
                /**
                * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                get: function () {
                    return this._strokeStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new EndGate.Graphics.Color(color);
                    }

                    // Unbind old
                    this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                    this._strokeStyle = color;

                    // Bind new
                    this._strokeStyle.OnChange.Bind(this._strokeChangeWire);

                    // Update state
                    this._strokeChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowColor", {
                /**
                * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                get: function () {
                    return this._shadowColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new EndGate.Graphics.Color(color);
                    }

                    // Unbind old
                    this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
                    this._shadowColor = color;

                    // Bind new
                    this._shadowColor.OnChange.Bind(this._shadowChangeWire);

                    // Update state
                    this._shadowChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowX", {
                /**
                * Gets or sets the current horizontal shadow position.
                */
                get: function () {
                    return this._State.ShadowOffsetX;
                },
                set: function (x) {
                    this._State.ShadowOffsetX = x;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowY", {
                /**
                * Gets or sets the current vertical shadow position.
                */
                get: function () {
                    return this._State.ShadowOffsetY;
                },
                set: function (y) {
                    this._State.ShadowOffsetY = y;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "ShadowBlur", {
                /**
                * Gets or sets the current shadow blur.
                */
                get: function () {
                    return this._State.ShadowBlur;
                },
                set: function (blur) {
                    this._State.ShadowBlur = blur;
                },
                enumerable: true,
                configurable: true
            });

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
                context.fill();

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

            Shape.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);

                this._fillStyle.OnChange.Unbind(this._fillChangeWire);
                this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                this._shadowColor.OnChange.Unbind(this._shadowChangeWire);
            };

            Shape.prototype._Clone = function (graphic) {
                graphic.Border(this.BorderThickness, this.BorderColor.Clone());
                graphic.Shadow(this.ShadowX, this.ShadowY, this.ShadowColor.Clone(), this.ShadowBlur);

                _super.prototype._Clone.call(this, graphic);
            };
            return Shape;
        })(EndGate.Graphics.Graphic2d);
        Graphics.Shape = Shape;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
