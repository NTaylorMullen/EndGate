var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Graphics) {
            (function (Text) {
                (function (FontStyle) {
                    FontStyle._map = [];
                    FontStyle._map[0] = "Normal";
                    FontStyle.Normal = 0;
                    FontStyle._map[1] = "Italic";
                    FontStyle.Italic = 1;
                    FontStyle._map[2] = "Oblique";
                    FontStyle.Oblique = 2;
                })(Text.FontStyle || (Text.FontStyle = {}));
                var FontStyle = Text.FontStyle;
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
                Text.FontStyleHelper = FontStyleHelper;                
                FontStyleHelper._Initialize();
            })(Graphics.Text || (Graphics.Text = {}));
            var Text = Graphics.Text;
        })(Core.Graphics || (Core.Graphics = {}));
        var Graphics = Core.Graphics;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=FontStyle.js.map
