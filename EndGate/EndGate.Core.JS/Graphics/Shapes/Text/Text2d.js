var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Graphic2d.ts" />
    /// <reference path="../../Color.ts" />
    /// <reference path="../../../Utilities/NoopTripInvoker.ts" />
    /// <reference path="../../../Bounds/BoundingRectangle.ts" />
    /// <reference path="../Shape.ts" />
    /// <reference path="Font/FontSettings.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable text element.
        */
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, text, color) {
                if (typeof color === "undefined") { color = Graphics.Color.Black; }
                _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Text2d";

                this._text = text;

                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One);
                this._recalculateBoundsSize = true;

                this._fontSettings = new Graphics.Assets.FontSettings();
                this.Align = "center";
                this.Baseline = "middle";
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

            Text2d.prototype._StartDraw = function (context) {
                context.save();
                this._State.SetContextState(context);

                context.translate(this.Position.X, this.Position.Y);

                if (this.Rotation !== 0) {
                    context.rotate(this.Rotation);
                }
            };

            Text2d.prototype._EndDraw = function (context) {
                var children = this.GetChildren();

                for (var i = 0; i < children.length; i++) {
                    if (children[i].Visible) {
                        children[i].Draw(context);
                    }
                }

                context.restore();
            };

            /**
            * Draws the text onto the given context.  If this Text2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the text onto.
            */
            Text2d.prototype.Draw = function (context) {
                var textSize;

                this._State.Font = this._fontSettings._BuildFont();

                this._StartDraw(context);

                context.fillText(this._text, 0, 0);
                if (this._State.LineWidth > 0) {
                    context.strokeText(this._text, 0, 0);
                }

                if (this._recalculateBoundsSize) {
                    this._recalculateBoundsSize = false;
                    textSize = context.measureText(this._text);
                    this._drawBounds.Size.Width = textSize.width;
                    this._drawBounds.Size.Height = parseInt(this._fontSettings.FontSize) * 1.5;
                }

                this._EndDraw(context);
            };

            /**
            * The bounding area that represents where the Text2d will draw.
            */
            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;

                return this._drawBounds;
            };

            /**
            * Scale's the fonts FontSize.
            * @param scale The value to multiply the graphic's size by.
            */
            Text2d.prototype.Scale = function (scale) {
                var size = parseInt(this.FontSettings.FontSize);

                this.FontSettings.FontSize = this.FontSettings.FontSize.replace(size.toString(), (size * scale).toString());
            };

            /**
            * Returns a nearly identical copy of this Text2d.  If this Text2d belongs to a parent, the cloned Text2d will not. If this Text2d has children, all children will be cloned as well.  Lastly, the cloned Text2d will not have the same event bindings as this one does.
            */
            Text2d.prototype.Clone = function () {
                var graphic = new Text2d(this.Position.X, this.Position.Y, this.Text, this.Color.Clone());

                graphic.Align = this.Align;
                graphic.Baseline = this.Baseline;
                graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
                graphic.FontSettings.FontSize = this.FontSettings.FontSize;
                graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
                graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
                graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };
            return Text2d;
        })(Graphics.Shape);
        Graphics.Text2d = Text2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
