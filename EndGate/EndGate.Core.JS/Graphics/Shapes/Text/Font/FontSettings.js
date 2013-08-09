var EndGate;
(function (EndGate) {
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
                    * Gets or sets the current font size.  Values can be things such as 20px.
                    */
                    function () {
                        return this._cachedState["fontSize"];
                    },
                    set: function (size) {
                        this._refreshCache = true;
                        this._cachedState["fontSize"] = size;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontFamily", {
                    get: /**
                    * Gets or sets the font family.
                    */
                    function () {
                        return this._cachedState["fontFamily"];
                    },
                    set: function (family) {
                        this._refreshCache = true;
                        this._cachedState["fontFamily"] = family;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontVariant", {
                    get: /**
                    * Gets or sets the font variant.
                    */
                    function () {
                        return this._cachedState["fontVariant"];
                    },
                    set: function (variant) {
                        this._refreshCache = true;
                        this._cachedState["fontVariant"] = variant;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontWeight", {
                    get: /**
                    * Gets or sets the current font weight.
                    */
                    function () {
                        return this._cachedState["fontWeight"];
                    },
                    set: function (weight) {
                        this._refreshCache = true;
                        this._cachedState["fontWeight"] = weight;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(FontSettings.prototype, "FontStyle", {
                    get: /**
                    * Gets or sets the current font style.
                    */
                    function () {
                        return this._cachedState["fontStyle"];
                    },
                    set: function (style) {
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
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
