module EndGate.Graphics.Assets {

    export enum FontFamily {
        Antiqua,
        Arial,
        Avqest,
        Blackletter,
        Calibri,
        ComicSans,
        Courier,
        Decorative,
        Fraktur,
        Frosty,
        Garamond,
        Georgia,
        Helvetica,
        Impact,
        Minion,
        Modern,
        Monospace,
        Palatino,
        Roman,
        Script,
        Swiss,
        TimesNewRoman,
        Verdana
    };

    export class FontFamilyHelper {
        public static _families: { [family: number]: string; };

        public static _Initialize() {
            FontFamilyHelper._families = (<{ [family: number]: string; } >{});

            for (var family in FontFamily) {
                if (family !== "_map") {
                    FontFamilyHelper._families[FontFamily[family]] = family;
                }
            }

            FontFamilyHelper._families[FontFamily["TimesNewRoman"]] = "Times New Roman";
        }

        public static Get(family: FontFamily): string {
            return FontFamilyHelper._families[family];
        }
    }

    FontFamilyHelper._Initialize();

}