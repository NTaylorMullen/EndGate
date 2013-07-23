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
    /// <reference path="../../Utilities/NoopTripInvoker.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    /// <reference path="Font/FontSettings.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable text element.
        */
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, text, color) {
                if (typeof color === "undefined") { color = "black"; }
                var _this = this;
                _super.call(this, new EndGate.Vector2d(x, y));
                this._type = "Text2d";

                this._text = text;
                this._stroker = new EndGate._.Utilities.NoopTripInvoker(function (context) {
                    context.strokeText(_this._text, 0, 0);
                });

                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One);
                this._recalculateBoundsSize = true;

                this._fontSettings = new Graphics.Assets.FontSettings();
                this.Align = "center";
                this.Baseline = "middle";
                this.Color = color;
            }
            Object.defineProperty(Text2d.prototype, "Align", {
                get: /**
                * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
                */
                function () {
                    return this._State.TextAlign;
                },
                set: function (alignment) {
                    this._State.TextAlign = alignment;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Baseline", {
                get: /**
                * Gets or sets the text baseline of the Text2d.  Values can be "top", "hanging", "middle", "alphabetic", "ideographic", and "bottom".
                */
                function () {
                    return this._State.TextBaseline;
                },
                set: function (baseline) {
                    this._State.TextBaseline = baseline;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Color", {
                get: /**
                * Gets or sets the current text color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.FillStyle;
                },
                set: function (color) {
                    this._State.FillStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowColor", {
                get: /**
                * Gets or sets the current shadow color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.ShadowColor;
                },
                set: function (color) {
                    this._State.ShadowColor = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "ShadowX", {
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

            Object.defineProperty(Text2d.prototype, "ShadowY", {
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

            Object.defineProperty(Text2d.prototype, "ShadowBlur", {
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

            Object.defineProperty(Text2d.prototype, "FontSettings", {
                get: /**
                * Gets the Text2d's FontSetting's.
                */
                function () {
                    this._recalculateBoundsSize = true;

                    return this._fontSettings;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderThickness", {
                get: /**
                * Gets or sets the current border thickness.
                */
                function () {
                    return this._State.LineWidth;
                },
                set: function (thickness) {
                    if (thickness === 0) {
                        this._stroker.Reset();
                    } else {
                        this._stroker.Trip();
                    }

                    this._State.LineWidth = thickness;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderColor", {
                get: /**
                * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._State.StrokeStyle;
                },
                set: function (color) {
                    this._stroker.Trip();
                    this._State.StrokeStyle = color;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "Text", {
                get: /**
                * Gets or sets the current Text2d's text.
                */
                function () {
                    return this._text;
                },
                set: function (text) {
                    this._recalculateBoundsSize = true;
                    this._text = text;
                },
                enumerable: true,
                configurable: true
            });

            Text2d.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX = x;
                this.ShadowY = y;
                this.ShadowColor = color;
                this.ShadowBlur = blur;
            };

            /**
            * Sets the current borders thickness and color.
            * @param thickness The new border thickness in pixels.
            * @param color The new border color.  Can be valid color strings, like "red" or "rgb(255,0,0)".
            */
            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            /**
            * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the text onto.
            */
            Text2d.prototype.Draw = function (context) {
                var textSize;

                this._State.Font = this._fontSettings._BuildFont();

                _super.prototype._StartDraw.call(this, context);

                context.fillText(this._text, 0, 0);
                this._stroker.Invoke(context);

                if (this._recalculateBoundsSize) {
                    this._recalculateBoundsSize = false;
                    textSize = context.measureText(this._text);
                    this._drawBounds.Size.Width = textSize.width;
                    this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
                }

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the Text2d will draw.
            */
            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;

                return this._drawBounds;
            };
            return Text2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Text2d = Text2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
