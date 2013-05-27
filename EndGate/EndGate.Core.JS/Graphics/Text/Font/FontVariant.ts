module EndGate.Graphics.Assets {

    /**
    * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
    */
    export enum FontVariant {
        Normal,
        SmallCaps
    };

    export class _FontVariantHelper {
        public static _variants: { [variant: number]: string; };

        public static _Initialize() {
            _FontVariantHelper._variants = (<{ [family: number]: string; } >{});

            for (var family in FontVariant) {
                if (family !== "_map") {
                    _FontVariantHelper._variants[FontVariant[family]] = family;
                }
            }

            _FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
        }

        public static Get(variant: FontVariant): string {
            return _FontVariantHelper._variants[variant];
        }
    }

    _FontVariantHelper._Initialize();

}

