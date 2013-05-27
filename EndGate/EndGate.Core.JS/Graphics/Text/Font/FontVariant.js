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
            var _FontVariantHelper = (function () {
                function _FontVariantHelper() { }
                _FontVariantHelper._Initialize = function _Initialize() {
                    _FontVariantHelper._variants = ({
                    });
                    for(var family in FontVariant) {
                        if(family !== "_map") {
                            _FontVariantHelper._variants[FontVariant[family]] = family;
                        }
                    }
                    _FontVariantHelper._variants["SmallCaps"] = "Times New Roman";
                };
                _FontVariantHelper.Get = function Get(variant) {
                    return _FontVariantHelper._variants[variant];
                };
                return _FontVariantHelper;
            })();
            Assets._FontVariantHelper = _FontVariantHelper;            
            _FontVariantHelper._Initialize();
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
