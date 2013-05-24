var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
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
            var FontStyleHelper = (function () {
                function FontStyleHelper() { }
                FontStyleHelper._Initialize = function _Initialize() {
                    FontStyleHelper._styles = ({
                    });
                    for(var style in FontStyle) {
                        if(style !== "_map") {
                            FontStyleHelper._styles[FontStyle[style]] = style;
                        }
                    }
                };
                FontStyleHelper.Get = function Get(style) {
                    return FontStyleHelper._styles[style];
                };
                return FontStyleHelper;
            })();
            Assets.FontStyleHelper = FontStyleHelper;            
            FontStyleHelper._Initialize();
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=FontStyle.js.map
