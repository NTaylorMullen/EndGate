var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
            */
            (function (FontVariant) {
                FontVariant._map = [];
                FontVariant._map[0] = "Normal";
                FontVariant.Normal = 0;
                FontVariant._map[1] = "SmallCaps";
                FontVariant.SmallCaps = 1;
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (_) {
                var FontVariantHelper = (function () {
                    function FontVariantHelper() { }
                    FontVariantHelper._Initialize = function _Initialize() {
                        FontVariantHelper._variants = ({
                        });
                        for(var family in Assets.FontVariant) {
                            if(family !== "_map") {
                                FontVariantHelper._variants[Assets.FontVariant[family]] = family;
                            }
                        }
                        FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
                    };
                    FontVariantHelper.Get = function Get(variant) {
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
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
