/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var Graphic2dState = (function () {
                    function Graphic2dState() {
                        this._cachedState = {};
                    }
                    Object.defineProperty(Graphic2dState.prototype, "StrokeStyle", {
                        get: function () {
                            return this._cachedState["strokeStyle"];
                        },
                        set: function (value) {
                            this._cachedState["strokeStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "FillStyle", {
                        get: function () {
                            return this._cachedState["fillStyle"];
                        },
                        set: function (value) {
                            this._cachedState["fillStyle"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalAlpha", {
                        get: function () {
                            return this._cachedState["globalAlpha"];
                        },
                        set: function (value) {
                            this._cachedState["globalAlpha"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineWidth", {
                        get: function () {
                            return this._cachedState["lineWidth"];
                        },
                        set: function (value) {
                            this._cachedState["lineWidth"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineCap", {
                        get: function () {
                            return this._cachedState["lineCap"];
                        },
                        set: function (value) {
                            this._cachedState["lineCap"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "LineJoin", {
                        get: function () {
                            return this._cachedState["lineJoin"];
                        },
                        set: function (value) {
                            this._cachedState["lineJoin"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "MiterLimit", {
                        get: function () {
                            return this._cachedState["miterLimit"];
                        },
                        set: function (value) {
                            this._cachedState["miterLimit"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetX", {
                        get: function () {
                            return this._cachedState["shadowOffsetX"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetX"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowOffsetY", {
                        get: function () {
                            return this._cachedState["shadowOffsetY"];
                        },
                        set: function (value) {
                            this._cachedState["shadowOffsetY"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowBlur", {
                        get: function () {
                            return this._cachedState["shadowBlur"];
                        },
                        set: function (value) {
                            this._cachedState["shadowBlur"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "ShadowColor", {
                        get: function () {
                            return this._cachedState["shadowColor"];
                        },
                        set: function (value) {
                            this._cachedState["shadowColor"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "GlobalCompositeOperation", {
                        get: function () {
                            return this._cachedState["globalCompositeOperation"];
                        },
                        set: function (value) {
                            this._cachedState["globalCompositeOperation"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "Font", {
                        get: function () {
                            return this._cachedState["font"];
                        },
                        set: function (value) {
                            this._cachedState["font"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextAlign", {
                        get: function () {
                            return this._cachedState["textAlign"];
                        },
                        set: function (value) {
                            this._cachedState["textAlign"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Object.defineProperty(Graphic2dState.prototype, "TextBaseline", {
                        get: function () {
                            return this._cachedState["textBaseline"];
                        },
                        set: function (value) {
                            this._cachedState["textBaseline"] = value;
                        },
                        enumerable: true,
                        configurable: true
                    });

                    Graphic2dState.prototype.SetContextState = function (context) {
                        for (var key in this._cachedState) {
                            context[key] = this._cachedState[key];
                        }
                    };
                    return Graphic2dState;
                })();
                _.Graphic2dState = Graphic2dState;
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
