var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            (function (FontVariant) {
                FontVariant._map = [];
                FontVariant._map[0] = "Normal";
                FontVariant.Normal = 0;
                FontVariant._map[1] = "SmallCaps";
                FontVariant.SmallCaps = 1;
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
            ;
            var FontVariantHelper = (function () {
                function FontVariantHelper() { }
                FontVariantHelper._Initialize = function _Initialize() {
                    FontVariantHelper._variants = ({
                    });
                    for(var family in FontVariant) {
                        if(family !== "_map") {
                            FontVariantHelper._variants[FontVariant[family]] = family;
                        }
                    }
                    FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
                };
                FontVariantHelper.Get = function Get(variant) {
                    return FontVariantHelper._variants[variant];
                };
                return FontVariantHelper;
            })();
            Assets.FontVariantHelper = FontVariantHelper;            
            FontVariantHelper._Initialize();
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=FontVariant.js.map
