var eg;
(function (eg) {
    (function (Graphics) {
        /// <reference path="FontMeasurement.ts" />
        /// <reference path="FontFamily.ts" />
        /// <reference path="FontVariant.ts" />
        /// <reference path="FontStyle.ts" />
        (function (Assets) {
            /**
            * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
            */
            var FontSettings = (function () {
                /**
                * Creates a new instance of the FontSettings object with the following default values.
                * FontSize: 10px
                * FontFamily: Times New Roman
                */
                function FontSettings() {
                    this._cachedState = {
                        fontSize: "10px",
                        fontFamily: "Times New Roman",
                        fontVariant: "",
                        fontWeight: "",
                        fontStyle: ""
                    };

                    this._refreshCache = true;
                    this._BuildFont();
                }
                FontSettings.prototype.FontSize = function (size, measurement) {
                    if (typeof measurement === "undefined") { measurement = Assets.FontMeasurement.Points; }
                    if (size !== undefined) {
                        return this.GetOrSetCache("fontSize", size.toString() + Assets._.FontMeasurementHelper.Get(measurement));
                    }

                    return this._cachedState["fontSize"];
                };

                FontSettings.prototype.FontFamily = function (family) {
                    return this.GetOrSetCache("fontFamily", Assets._.FontFamilyHelper.Get(family));
                };

                FontSettings.prototype.FontVariant = function (variant) {
                    return this.GetOrSetCache("fontVariant", Assets._.FontVariantHelper.Get(variant));
                };

                FontSettings.prototype.FontWeight = function (weight) {
                    return this.GetOrSetCache("fontWeight", weight);
                };

                FontSettings.prototype.FontStyle = function (style) {
                    return this.GetOrSetCache("fontStyle", Assets._.FontStyleHelper.Get(style));
                };

                FontSettings.prototype._BuildFont = function () {
                    var font;

                    if (this._refreshCache) {
                        font = this._cachedState["fontWeight"] + " " + this._cachedState["fontStyle"] + " " + this._cachedState["fontSize"] + " " + this._cachedState["fontVariant"];

                        if (this._cachedState["fontFamily"]) {
                            font += this._cachedState["fontFamily"];

                            if (this._cachedState["fontFamilyType"]) {
                                font += ", " + this._cachedState["fontFamilyType"];
                            }
                        } else if (this._cachedState["fontFamilyType"]) {
                            font += this._cachedState["fontFamilyType"];
                        }

                        this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        this._refreshCache = false;
                    }

                    return this._cachedFont;
                };

                FontSettings.prototype.GetOrSetCache = function (property, value) {
                    if (typeof value !== "undefined") {
                        this._cachedState[property] = value;
                        this._refreshCache = true;
                    }

                    return this._cachedState[property];
                };
                return FontSettings;
            })();
            Assets.FontSettings = FontSettings;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
