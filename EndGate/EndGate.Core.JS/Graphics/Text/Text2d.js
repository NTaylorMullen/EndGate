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
                if (typeof color === "undefined") { color = Graphics.Color.Black; }
                var _this = this;
                _super.call(this, new PIXI.Text(text, {}), new EndGate.Vector2d(x, y));
                this._type = "Text2d";

                // Save the built graphic and set it to a noop so it's not re-built tons of times during construction.
                var savedBuildGraphic = this._BuildGraphic;
                this._BuildGraphic = function () {
                };

                this._text = text;

                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One);

                this._fontSettings = new Graphics.Assets.FontSettings();

                this.SetStyleProperty("font", this._fontSettings._BuildFont());
                this.PixiBase.anchor.x = this.PixiBase.anchor.y = .5;
                this.Align = "center";

                this._graphicChangedWire = function () {
                    _this._BuildGraphic();
                };

                this.BorderColor = this._strokeColor = Graphics.Color.Black;
                this._borderThickness = 0;

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this.Color = this._fillColor = color;
                } else {
                    this.Color = this._fillColor = Graphics.Color.Black;
                }

                // Set the BuildGraphic function to its appropriate values now that all data points have been constructed.
                this._BuildGraphic = savedBuildGraphic;

                this._BuildGraphic();
            }
            Object.defineProperty(Text2d.prototype, "Color", {
                get: /**
                * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._fillColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    // Unbind old
                    this._fillColor.OnChange.Unbind(this._graphicChangedWire);
                    this._fillColor = color;

                    // Bind new
                    this._fillColor.OnChange.Bind(this._graphicChangedWire);

                    // Update state
                    this._graphicChangedWire();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderThickness", {
                get: /**
                * Gets or sets the current border thickness.
                */
                function () {
                    return this._borderThickness;
                },
                set: function (thickness) {
                    this._borderThickness = thickness;
                    this._graphicChangedWire();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "BorderColor", {
                get: /**
                * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._strokeColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    // Unbind old
                    this._strokeColor.OnChange.Unbind(this._graphicChangedWire);
                    this._strokeColor = color;

                    // Bind new
                    this._strokeColor.OnChange.Bind(this._graphicChangedWire);

                    // Update state
                    this._graphicChangedWire();
                },
                enumerable: true,
                configurable: true
            });

            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            Object.defineProperty(Text2d.prototype, "Align", {
                get: /**
                * Gets or sets the text alignment of the Text2d.  Values can be "start", "end", "left", "center", or "right".
                */
                function () {
                    return this.GetStyleProperty("align");
                },
                set: function (alignment) {
                    this.SetStyleProperty("align", alignment);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Text2d.prototype, "FontSettings", {
                get: /**
                * Gets the Text2d's FontSetting's.
                */
                function () {
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
                    this._text = text;
                    this.PixiBase.setText(text);
                },
                enumerable: true,
                configurable: true
            });

            Text2d.prototype._BuildGraphic = function () {
                this.SetStyleProperty("fill", this.Color.toString());
                this.SetStyleProperty("strokeThickness", this.BorderThickness);
                this.SetStyleProperty("stroke", this.BorderColor);
            };

            /**
            * The bounding area that represents where the Text2d will draw.
            */
            Text2d.prototype.GetDrawBounds = function () {
                this._drawBounds.Rotation = this.Rotation;
                this._drawBounds.Position = this.Position;
                this._drawBounds.Size.Width = this.PixiBase.width;
                this._drawBounds.Size.Height = this.PixiBase.height;

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
                graphic.FontSettings.FontFamily = this.FontSettings.FontFamily;
                graphic.FontSettings.FontSize = this.FontSettings.FontSize;
                graphic.FontSettings.FontStyle = this.FontSettings.FontStyle;
                graphic.FontSettings.FontVariant = this.FontSettings.FontVariant;
                graphic.FontSettings.FontWeight = this.FontSettings.FontWeight;

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Text2d.prototype.SetStyleProperty = function (property, value) {
                (this.PixiBase).style[property] = value;
                (this.PixiBase).dirty = true;
            };

            Text2d.prototype.GetStyleProperty = function (property) {
                return (this.PixiBase).style[property];
            };
            return Text2d;
        })(Graphics.Graphic2d);
        Graphics.Text2d = Text2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
