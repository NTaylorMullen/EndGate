var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Text) {
                var Text2d = (function (_super) {
                    __extends(Text2d, _super);
                    function Text2d(position, text, color) {
                        if (typeof color === "undefined") { color = "black"; }
                        var _this = this;
                                        _super.call(this, position);
                        this._text = text;
                        this._stroker = new Core.Utilities.NoopTripInvoker(function (context) {
                            context.strokeText(_this._text, _this.Position.X, _this.Position.Y);
                        });
                        this.FontSettings = new Text.FontSettings();
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
                        return [
                            this.ShadowX(x), 
                            this.ShadowY(y), 
                            this.ShadowColor(color), 
                            this.ShadowBlur(blur)
                        ];
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
                        return [
                            this.BorderThickness(thickness), 
                            this.BorderColor(color)
                        ];
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
                        _super.prototype.StartDraw.call(this, context);
                        this.State.Font(this.FontSettings._BuildFont());
                        context.fillText(this._text, this.Position.X, this.Position.Y);
                        this._stroker.Invoke(context);
                        _super.prototype.EndDraw.call(this, context);
                    };
                    return Text2d;
                })(Graphics.Graphic2d);
                Text.Text2d = Text2d;                
            })(Graphics.Text || (Graphics.Text = {}));
            var Text = Graphics.Text;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Text2d.js.map
