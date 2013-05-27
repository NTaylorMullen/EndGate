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
            var _FontStyleHelper = (function () {
                function _FontStyleHelper() { }
                _FontStyleHelper._Initialize = function _Initialize() {
                    _FontStyleHelper._styles = ({
                    });
                    for(var style in FontStyle) {
                        if(style !== "_map") {
                            _FontStyleHelper._styles[FontStyle[style]] = style;
                        }
                    }
                };
                _FontStyleHelper.Get = function Get(style) {
                    return _FontStyleHelper._styles[style];
                };
                return _FontStyleHelper;
            })();
            Assets._FontStyleHelper = _FontStyleHelper;            
            _FontStyleHelper._Initialize();
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
