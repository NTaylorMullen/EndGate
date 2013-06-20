var eg;
(function (eg) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
            */
            (function (FontVariant) {
                FontVariant[FontVariant["Normal"] = 0] = "Normal";

                FontVariant[FontVariant["SmallCaps"] = 1] = "SmallCaps";
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
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
                var FontVariantHelper = (function () {
                    function FontVariantHelper() {
                    }
                    FontVariantHelper._Initialize = function () {
                        FontVariantHelper._variants = ({});

                        for (var family in Assets.FontVariant) {
                            if (family !== "_map") {
                                FontVariantHelper._variants[Assets.FontVariant[family]] = family;
                            }
                        }

                        FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
                    };

                    FontVariantHelper.Get = function (variant) {
                        return FontVariantHelper._variants[variant];
                    };
                    return FontVariantHelper;
                })();
                _.FontVariantHelper = FontVariantHelper;

                FontVariantHelper._Initialize();
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
