module EndGate.Graphics.Assets {

    /**
    * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
    */
    export enum FontStyle {
        Normal,
        Italic,
        Oblique
    }

    export class _FontStyleHelper {
        public static _styles: { [family: number]: string; };

        public static _Initialize() {
            _FontStyleHelper._styles = (<{ [family: number]: string; } >{});

            for (var style in FontStyle) {
                if (style !== "_map") {
                    _FontStyleHelper._styles[FontStyle[style]] = style;
                }
            }
        }

        public static Get(style: FontStyle): string {
            return _FontStyleHelper._styles[style];
        }
    }

    _FontStyleHelper._Initialize();

}

