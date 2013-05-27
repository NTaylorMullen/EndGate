module EndGate.Graphics.Assets {

    /**
    * Defines valid FontFamilies that can be used to display Text2d's differently.
    */
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

    export class _FontFamilyHelper {
        public static _families: { [family: number]: string; };

        public static _Initialize() {
            _FontFamilyHelper._families = (<{ [family: number]: string; } >{});

            for (var family in FontFamily) {
                if (family !== "_map") {
                    _FontFamilyHelper._families[FontFamily[family]] = family;
                }
            }

            _FontFamilyHelper._families[FontFamily["TimesNewRoman"]] = "Times New Roman";
        }

        public static Get(family: FontFamily): string {
            return _FontFamilyHelper._families[family];
        }
    }

    _FontFamilyHelper._Initialize();

}