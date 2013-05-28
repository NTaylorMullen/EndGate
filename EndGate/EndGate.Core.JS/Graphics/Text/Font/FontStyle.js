var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
            */
            (function (FontStyle) {
                FontStyle._map = [];
                FontStyle._map[0] = "Normal";
                FontStyle.Normal = 0;
                FontStyle._map[1] = "Italic";
                FontStyle.Italic = 1;
                FontStyle._map[2] = "Oblique";
                FontStyle.Oblique = 2;
            })(Assets.FontStyle || (Assets.FontStyle = {}));
            var FontStyle = Assets.FontStyle;
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
                var FontStyleHelper = (function () {
                    function FontStyleHelper() { }
                    FontStyleHelper._Initialize = function _Initialize() {
                        FontStyleHelper._styles = ({
                        });
                        for(var style in Assets.FontStyle) {
                            if(style !== "_map") {
                                FontStyleHelper._styles[Assets.FontStyle[style]] = style;
                            }
                        }
                    };
                    FontStyleHelper.Get = function Get(style) {
                        return FontStyleHelper._styles[style];
                    };
                    return FontStyleHelper;
                })();
                _.FontStyleHelper = FontStyleHelper;                
                FontStyleHelper._Initialize();
            })(Assets._ || (Assets._ = {}));
            var _ = Assets._;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
