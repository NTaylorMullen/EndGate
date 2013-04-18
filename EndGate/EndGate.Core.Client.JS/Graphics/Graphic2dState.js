var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            var Graphic2dState = (function () {
                function Graphic2dState() {
                    this._type = "Graphic2dState";
                    this._cachedState = {
                    };
                }
                Graphic2dState.prototype.StrokeStyle = function (value) {
                    return this.GetOrSetCache("strokeStyle", value);
                };
                Graphic2dState.prototype.FillStyle = function (value) {
                    return this.GetOrSetCache("fillStyle", value);
                };
                Graphic2dState.prototype.GlobalAlpha = function (value) {
                    return this.GetOrSetCache("globalAlpha", value);
                };
                Graphic2dState.prototype.LineWidth = function (value) {
                    return this.GetOrSetCache("lineWidth", value);
                };
                Graphic2dState.prototype.LineCap = function (value) {
                    return this.GetOrSetCache("lineCap", value);
                };
                Graphic2dState.prototype.LineJoin = function (value) {
                    return this.GetOrSetCache("lineJoin", value);
                };
                Graphic2dState.prototype.MiterLimit = function (value) {
                    return this.GetOrSetCache("miterLimit", value);
                };
                Graphic2dState.prototype.ShadowOffsetX = function (value) {
                    return this.GetOrSetCache("shadowOffsetX", value);
                };
                Graphic2dState.prototype.ShadowOffsetY = function (value) {
                    return this.GetOrSetCache("shadowOffsetY", value);
                };
                Graphic2dState.prototype.ShadowBlur = function (value) {
                    return this.GetOrSetCache("shadowBlur", value);
                };
                Graphic2dState.prototype.ShadowColor = function (value) {
                    return this.GetOrSetCache("shadowColor", value);
                };
                Graphic2dState.prototype.GlobalCompositeOperation = function (value) {
                    return this.GetOrSetCache("globalCompositeOperation", value);
                };
                Graphic2dState.prototype.Font = function (value) {
                    return this.GetOrSetCache("font", value);
                };
                Graphic2dState.prototype.TextAlign = function (value) {
                    return this.GetOrSetCache("textAlign", value);
                };
                Graphic2dState.prototype.TextBaseline = function (value) {
                    return this.GetOrSetCache("textBaseline", value);
                };
                Graphic2dState.prototype.SetContextState = function (context) {
                    for(var key in this._cachedState) {
                        context[key] = this._cachedState[key];
                    }
                };
                Graphic2dState.prototype.GetOrSetCache = function (property, value) {
                    if(typeof value !== "undefined") {
                        this._cachedState[property] = value;
                    }
                    return this._cachedState[property];
                };
                return Graphic2dState;
            })();
            Graphics.Graphic2dState = Graphic2dState;            
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Graphic2dState.js.map
