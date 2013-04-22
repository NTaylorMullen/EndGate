/// <reference path="FontMeasurement.ts" />
/// <reference path="FontFamily.ts" />
/// <reference path="FontVariant.ts" />
/// <reference path="FontStyle.ts" />

module EndGate.Core.Graphics.Text {

    export class FontSettings {
        private _cachedState: { [property: string]: any; };
        private _cachedFont: string;
        private _refreshCache: bool;

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

        public FontSize(size?: number, measurement: FontMeasurement = FontMeasurement.Points): string {
            if (size !== undefined) {
                return this.GetOrSetCache("fontSize", size.toString() + FontMeasurementHelper.Get(measurement));
            }
            
            return this._cachedState["fontSize"];
        }

        public FontFamily(family?: FontFamily): string {
            return this.GetOrSetCache("fontFamily", FontFamilyHelper.Get(family));
        }

        public FontVariant(variant?: FontVariant): string {
            return this.GetOrSetCache("fontVariant", FontVariantHelper.Get(variant));
        }

        public FontWeight(weight?: string): string {
            return this.GetOrSetCache("fontWeight", weight);
        }

        public FontStyle(style?: FontStyle): string {
            return this.GetOrSetCache("fontStyle", FontStyleHelper.Get(style));
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
