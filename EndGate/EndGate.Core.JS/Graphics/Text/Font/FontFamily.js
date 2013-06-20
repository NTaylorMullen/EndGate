var eg;
(function (eg) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontFamilies that can be used to display Text2d's differently.
            */
            (function (FontFamily) {
                FontFamily[FontFamily["Antiqua"] = 0] = "Antiqua";
                FontFamily[FontFamily["Arial"] = 1] = "Arial";
                FontFamily[FontFamily["Avqest"] = 2] = "Avqest";
                FontFamily[FontFamily["Blackletter"] = 3] = "Blackletter";
                FontFamily[FontFamily["Calibri"] = 4] = "Calibri";
                FontFamily[FontFamily["ComicSans"] = 5] = "ComicSans";
                FontFamily[FontFamily["Courier"] = 6] = "Courier";
                FontFamily[FontFamily["Decorative"] = 7] = "Decorative";
                FontFamily[FontFamily["Fraktur"] = 8] = "Fraktur";
                FontFamily[FontFamily["Frosty"] = 9] = "Frosty";
                FontFamily[FontFamily["Garamond"] = 10] = "Garamond";
                FontFamily[FontFamily["Georgia"] = 11] = "Georgia";
                FontFamily[FontFamily["Helvetica"] = 12] = "Helvetica";
                FontFamily[FontFamily["Impact"] = 13] = "Impact";
                FontFamily[FontFamily["Minion"] = 14] = "Minion";
                FontFamily[FontFamily["Modern"] = 15] = "Modern";
                FontFamily[FontFamily["Monospace"] = 16] = "Monospace";
                FontFamily[FontFamily["Palatino"] = 17] = "Palatino";
                FontFamily[FontFamily["Roman"] = 18] = "Roman";
                FontFamily[FontFamily["Script"] = 19] = "Script";
                FontFamily[FontFamily["Swiss"] = 20] = "Swiss";
                FontFamily[FontFamily["TimesNewRoman"] = 21] = "TimesNewRoman";

                FontFamily[FontFamily["Verdana"] = 22] = "Verdana";
            })(Assets.FontFamily || (Assets.FontFamily = {}));
            var FontFamily = Assets.FontFamily;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));

var eg;
(function (eg) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var FontFamilyHelper = (function () {
                    function FontFamilyHelper() {
                    }
                    FontFamilyHelper._Initialize = function () {
                        FontFamilyHelper._families = ({});

                        for (var family in Assets.FontFamily) {
                            if (family !== "_map") {
                                FontFamilyHelper._families[Assets.FontFamily[family]] = family;
                            }
                        }

                        FontFamilyHelper._families[Assets.FontFamily["TimesNewRoman"]] = "Times New Roman";
                    };

                    FontFamilyHelper.Get = function (family) {
                        return FontFamilyHelper._families[family];
                    };
                    return FontFamilyHelper;
                })();
                _.FontFamilyHelper = FontFamilyHelper;

                FontFamilyHelper._Initialize();
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
