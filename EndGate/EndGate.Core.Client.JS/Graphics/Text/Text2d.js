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
                    Text2d.prototype.Font = function (font) {
                        return this.State.Font(font);
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
