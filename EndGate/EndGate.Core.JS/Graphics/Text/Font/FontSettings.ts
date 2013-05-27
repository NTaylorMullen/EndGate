/// <reference path="FontMeasurement.ts" />
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
        private _refreshCache: bool;

        /**
        * Creates a new instance of the FontSettings object with the following default values.
        * FontSize: 10px
        * FontFamily: Times New Roman
        */
        constructor() {
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

        /**
        * Gets the current font size.
        */
        public FontSize(): string;
        /**
        * Sets and gets the current font size with the measurement in points.
        * @param size The new font size.
        */
        public FontSize(size: number): string;
        /**
        * Sets and gets the current font size.
        * @param size The new font size.
        * @param measurement The new font sizes measurement type.
        */
        public FontSize(size: number, measurement: FontMeasurement): string;
        public FontSize(size?: number, measurement: FontMeasurement = FontMeasurement.Points): string {
            if (size !== undefined) {
                return this.GetOrSetCache("fontSize", size.toString() + _FontMeasurementHelper.Get(measurement));
            }
            
            return this._cachedState["fontSize"];
        }

        /**
        * Gets the current font family.
        */
        public FontFamily(): string;
        /**
        * Sets and gets the current font family.
        * @param family The new font family.
        */
        public FontFamily(family: FontFamily): string;
        public FontFamily(family?: FontFamily): string {
            return this.GetOrSetCache("fontFamily", _FontFamilyHelper.Get(family));
        }

        /**
        * Gets the current font variant.
        */
        public FontVariant(): string;
        /**
        * Sets and gets the current font variant.
        * @param variant The new font variant.
        */
        public FontVariant(variant: FontVariant): string;
        public FontVariant(variant?: FontVariant): string {
            return this.GetOrSetCache("fontVariant", _FontVariantHelper.Get(variant));
        }

        /**
        * Gets the current font weight.
        */
        public FontWeight(): string;
        /**
        * Sets and gets the current font weight.
        * @param weight The new font weight.
        */
        public FontWeight(weight: string): string;
        public FontWeight(weight?: string): string {
            return this.GetOrSetCache("fontWeight", weight);
        }

        /**
        * Gets the current font style.
        */
        public FontStyle(): string;
        /**
        * Sets and gets the current font style.
        * @param style The new font style.
        */
        public FontStyle(style: FontStyle): string;
        public FontStyle(style?: FontStyle): string {
            return this.GetOrSetCache("fontStyle", _FontStyleHelper.Get(style));
        }

        public _BuildFont(): string {
            var font;

            if (this._refreshCache) {
                font = this._cachedState["fontWeight"] + " " + this._cachedState["fontStyle"] + " " + this._cachedState["fontSize"] + " " + this._cachedState["fontVariant"];

                if (this._cachedState["fontFamily"]) {
                    font += this._cachedState["fontFamily"];

                    if (this._cachedState["fontFamilyType"]) {
                        font += ", " + this._cachedState["fontFamilyType"];
                    }
                }
                else if (this._cachedState["fontFamilyType"]) {
                    font += this._cachedState["fontFamilyType"];
                }

                this._cachedFont = font.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                this._refreshCache = false;
            }

            return this._cachedFont;
        }

        private GetOrSetCache(property: string, value: any): any {
            if (typeof value !== "undefined") {
                this._cachedState[property] = value;
                this._refreshCache = true;
            }

            return this._cachedState[property];
        }
    }
}
