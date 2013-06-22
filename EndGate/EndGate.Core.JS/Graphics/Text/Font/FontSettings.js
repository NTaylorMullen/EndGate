var eg;
(function (eg) {
    (function (Graphics) {
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
                        fontFamily: Assets.FontFamily.TimesNewRoman,
                        fontVariant: Assets.FontVariant.Normal,
                        fontWeight: "",
                        fontStyle: Assets.FontStyle.Normal
                    };

                    this._refreshCache = true;
                    this._BuildFont();
                }
                Object.defineProperty(FontSettings.prototype, "FontSize", {
                    get: /**
                    * Gets the current font size.
                    */
                    function () {
                        return this._cachedState["fontSize"];
                    },
                    set: /**
                    * Sets the current font size.  Expects values such as 20px.
                    * @param size The new font size.
                    */
                    function (size) {
                        this._refreshCache = true;
                        this._cachedState["fontSize"] = size;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(FontSettings.prototype, "FontFamily", {
                    get: /**
                    * Gets the current font family.
                    */
                    function () {
                        return this._cachedState["fontFamily"];
                    },
                    set: /**
                    * Sets the current font family.
                    * @param family The new font family.
                    */
                    function (family) {
                        this._refreshCache = true;
                        this._cachedState["fontFamily"] = family;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(FontSettings.prototype, "FontVariant", {
                    get: /**
                    * Gets the current font variant.
                    */
                    function () {
                        return this._cachedState["fontVariant"];
                    },
                    set: /**
                    * Sets the current font variant.
                    * @param variant The new font variant.
                    */
                    function (variant) {
                        this._refreshCache = true;
                        this._cachedState["fontVariant"] = variant;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(FontSettings.prototype, "FontWeight", {
                    get: /**
                    * Gets the current font weight.
                    */
                    function () {
                        return this._cachedState["fontWeight"];
                    },
                    set: /**
                    * Sets the current font weight.
                    * @param weight The new font weight.
                    */
                    function (weight) {
                        this._refreshCache = true;
                        this._cachedState["fontWeight"] = weight;
                    },
                    enumerable: true,
                    configurable: true
                });


                Object.defineProperty(FontSettings.prototype, "FontStyle", {
                    get: /**
                    * Gets the current font style.
                    */
                    function () {
                        return this._cachedState["fontStyle"];
                    },
                    set: /**
                    * Sets and gets the current font style.
                    * @param style The new font style.
                    */
                    function (style) {
                        this._refreshCache = true;
                        this._cachedState["fontStyle"] = style;
                    },
                    enumerable: true,
                    configurable: true
                });


                FontSettings.prototype._BuildFont = function () {
                    var font;

                    if (this._refreshCache) {
                        font = this._cachedState["fontWeight"] + " " + Assets.FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + Assets.FontVariant[this._cachedState["fontVariant"]].replace("Normal", "") + " " + this._cachedState["fontSize"];

                        if (this._cachedState["fontFamily"] !== undefined) {
                            font += " " + Assets.FontFamily[this._cachedState["fontFamily"]];
                        }

                        this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        this._refreshCache = false;
                    }

                    return this._cachedFont;
                };
                return FontSettings;
            })();
            Assets.FontSettings = FontSettings;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
