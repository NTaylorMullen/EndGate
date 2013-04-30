module EndGate.Graphics.Assets {

    export enum FontStyle {
        Normal,
        Italic,
        Oblique
    }

    export class FontStyleHelper {
        public static _styles: { [family: number]: string; };

        public static _Initialize() {
            FontStyleHelper._styles = (<{ [family: number]: string; } >{});

            for (var style in FontStyle) {
                if (style !== "_map") {
                    FontStyleHelper._styles[FontStyle[style]] = style;
                }
            }
        }

        public static Get(style: FontStyle): string {
            return FontStyleHelper._styles[style];
        }
    }

    FontStyleHelper._Initialize();

}

