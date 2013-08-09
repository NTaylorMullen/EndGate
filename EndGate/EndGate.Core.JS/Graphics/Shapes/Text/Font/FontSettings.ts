/// <reference path="FontFamily.ts" />
/// <reference path="FontVariant.ts" />
/// <reference path="FontStyle.ts" />

module EndGate.Graphics.Assets {

    /**
    * Defines a set of font settings that are used to modify the appearance of text that is drawn via Text2d's.
    */
    export class FontSettings {
        private _cachedState: { [property: string]: any; };
        private _cachedFont: string;
        private _refreshCache: boolean;

        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor() {
            this._cachedState = {
                fontSize: "10px",
                fontFamily: FontFamily.TimesNewRoman,
                fontVariant: FontVariant.Normal,
                fontWeight: "",
                fontStyle: FontStyle.Normal
            };

            this._refreshCache = true;
            this._BuildFont();
        }

        /**
        * Gets or sets the current font size.  Values can be things such as 20px.
        */
        public get FontSize(): string {
            return this._cachedState["fontSize"];
        }
        public set FontSize(size: string) {
            this._refreshCache = true;
            this._cachedState["fontSize"] = size;
        }

        /**
        * Gets or sets the font family.
        */
        public get FontFamily(): FontFamily {
            return this._cachedState["fontFamily"];
        }
        public set FontFamily(family: FontFamily) {
            this._refreshCache = true;
            this._cachedState["fontFamily"] = family;
        }

        /**
        * Gets or sets the font variant.
        */
        public get FontVariant(): FontVariant {
            return this._cachedState["fontVariant"];
        }
        public set FontVariant(variant: FontVariant) {
            this._refreshCache = true;
            this._cachedState["fontVariant"] = variant;
        }

        /**
        * Gets or sets the current font weight.
        */
        public get FontWeight(): string {
            return this._cachedState["fontWeight"];
        }
        public set FontWeight(weight: string) {
            this._refreshCache = true;
            this._cachedState["fontWeight"] = weight;
        }

        /**
        * Gets or sets the current font style.
        */
        public get FontStyle(): FontStyle {
            return this._cachedState["fontStyle"];
        }
        public set FontStyle(style: FontStyle) {
            this._refreshCache = true;
            this._cachedState["fontStyle"] = style;
        }

        public _BuildFont(): string {
            var font;

            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + FontStyle[this._cachedState["fontStyle"]].replace("Normal", "") + " " + FontVariant[this._cachedState["fontVariant"]].replace("Normal", "")+ " " + this._cachedState["fontSize"];

                if (this._cachedState["fontFamily"] !== undefined) {
                    font += " " + FontFamily[this._cachedState["fontFamily"]];
                }
                               
                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }

            return this._cachedFont;
        }
    }
}
