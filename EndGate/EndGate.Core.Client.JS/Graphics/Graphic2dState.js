var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (LineCapType) {
                LineCapType._map = [];
                LineCapType._map[0] = "butt";
                LineCapType.butt = 0;
                LineCapType._map[1] = "round";
                LineCapType.round = 1;
                LineCapType._map[2] = "square";
                LineCapType.square = 2;
            })(Graphics.LineCapType || (Graphics.LineCapType = {}));
            var LineCapType = Graphics.LineCapType;
            ;
            (function (LineJoinType) {
                LineJoinType._map = [];
                LineJoinType._map[0] = "bevel";
                LineJoinType.bevel = 0;
                LineJoinType._map[1] = "round";
                LineJoinType.round = 1;
                LineJoinType._map[2] = "miter";
                LineJoinType.miter = 2;
            })(Graphics.LineJoinType || (Graphics.LineJoinType = {}));
            var LineJoinType = Graphics.LineJoinType;
            ;
            (function (TextAlignType) {
                TextAlignType._map = [];
                TextAlignType._map[0] = "center";
                TextAlignType.center = 0;
                TextAlignType._map[1] = "end";
                TextAlignType.end = 1;
                TextAlignType._map[2] = "left";
                TextAlignType.left = 2;
                TextAlignType._map[3] = "right";
                TextAlignType.right = 3;
                TextAlignType._map[4] = "start";
                TextAlignType.start = 4;
            })(Graphics.TextAlignType || (Graphics.TextAlignType = {}));
            var TextAlignType = Graphics.TextAlignType;
            ;
            (function (TextBaselineType) {
                TextBaselineType._map = [];
                TextBaselineType._map[0] = "alphabetic";
                TextBaselineType.alphabetic = 0;
                TextBaselineType._map[1] = "top";
                TextBaselineType.top = 1;
                TextBaselineType._map[2] = "hanging";
                TextBaselineType.hanging = 2;
                TextBaselineType._map[3] = "middle";
                TextBaselineType.middle = 3;
                TextBaselineType._map[4] = "ideographic";
                TextBaselineType.ideographic = 4;
                TextBaselineType._map[5] = "bottom";
                TextBaselineType.bottom = 5;
            })(Graphics.TextBaselineType || (Graphics.TextBaselineType = {}));
            var TextBaselineType = Graphics.TextBaselineType;
            ;
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
