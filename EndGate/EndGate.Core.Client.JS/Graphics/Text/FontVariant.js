var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Text) {
                (function (FontVariant) {
                    FontVariant._map = [];
                    FontVariant._map[0] = "Normal";
                    FontVariant.Normal = 0;
                    FontVariant._map[1] = "SmallCaps";
                    FontVariant.SmallCaps = 1;
                })(Text.FontVariant || (Text.FontVariant = {}));
                var FontVariant = Text.FontVariant;
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
                Text.FontVariantHelper = FontVariantHelper;                
                FontVariantHelper._Initialize();
            })(Graphics.Text || (Graphics.Text = {}));
            var Text = Graphics.Text;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=FontVariant.js.map
