var __extends = this.__extends || function (d, b) {
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
                this._drawBounds = new EndGate.Bounds.BoundingRectangle(this.Position, EndGate.Size2d.One());
                this.FontSettings = new Graphics.Assets.FontSettings();
                this.Align("center");
                this.Baseline("middle");
                this.Color(color);
            }
            Text2d.prototype.Align = function (alignment) {
                return this.State.TextAlign(alignment);
            };
            Text2d.prototype.Baseline = function (baseline) {
                return this.State.TextBaseline(baseline);
            };
            Text2d.prototype.Color = function (color) {
                return this.State.FillStyle(color);
            };
            Text2d.prototype.Shadow = function (x, y, color, blur) {
                this.ShadowX(x);
                this.ShadowY(y);
                this.ShadowColor(color);
                this.ShadowBlur(blur);
            };
            Text2d.prototype.ShadowColor = function (color) {
                return this.State.ShadowColor(color);
            };
            Text2d.prototype.ShadowX = function (val) {
                return this.State.ShadowOffsetX(val);
            };
            Text2d.prototype.ShadowY = function (val) {
                return this.State.ShadowOffsetY(val);
            };
            Text2d.prototype.ShadowBlur = function (val) {
                return this.State.ShadowBlur(val);
            };
            Text2d.prototype.Opacity = function (alpha) {
                return this.State.GlobalAlpha(alpha);
            };
            Text2d.prototype.Text = function (text) {
                if(typeof text !== "undefined") {
                    this._text = text;
                }
                return this._text;
            };
            Text2d.prototype.Border = function (thickness, color) {
                this.BorderThickness(thickness);
                this.BorderColor(color);
            };
            Text2d.prototype.BorderThickness = function (thickness) {
                if(thickness === 0) {
                    this._stroker.Reset();
                } else {
                    this._stroker.Trip();
                }
                return this.State.LineWidth(thickness);
            };
            Text2d.prototype.BorderColor = function (color) {
                this._stroker.Trip();
                return this.State.StrokeStyle(color);
            };
            Text2d.prototype.Draw = function (context) {
                var textSize;
                _super.prototype.StartDraw.call(this, context);
                this.State.Font(this.FontSettings._BuildFont());
                textSize = context.measureText(this._text);
                this._drawBounds.Size.Width = textSize.width;
                this._drawBounds.Size.Height = parseInt(this.FontSettings.FontSize()) * 1.5;
                context.fillText(this._text, 0, 0);
                this._stroker.Invoke(context);
                _super.prototype.EndDraw.call(this, context);
            };
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
