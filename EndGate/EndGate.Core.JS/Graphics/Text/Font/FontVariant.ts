module EndGate.Graphics.Assets {

    export enum FontVariant {
        Normal,
        SmallCaps
    };

    export class FontVariantHelper {
        public static _variants: { [variant: number]: string; };

        public static _Initialize() {
            FontVariantHelper._variants = (<{ [family: number]: string; } >{});

            for (var family in FontVariant) {
                if (family !== "_map") {
                    FontVariantHelper._variants[FontVariant[family]] = family;
                }
            }

            FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
        }

        public static Get(variant: FontVariant): string {
            return FontVariantHelper._variants[variant];
        }
    }

    FontVariantHelper._Initialize();

}

