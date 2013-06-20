var eg;
(function (eg) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontStyles that can be used to modify the font's style for Text2d's.
            */
            (function (FontStyle) {
                FontStyle[FontStyle["Normal"] = 0] = "Normal";
                FontStyle[FontStyle["Italic"] = 1] = "Italic";

                FontStyle[FontStyle["Oblique"] = 2] = "Oblique";
            })(Assets.FontStyle || (Assets.FontStyle = {}));
            var FontStyle = Assets.FontStyle;
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
                var FontStyleHelper = (function () {
                    function FontStyleHelper() {
                    }
                    FontStyleHelper._Initialize = function () {
                        FontStyleHelper._styles = ({});

                        for (var style in Assets.FontStyle) {
                            if (style !== "_map") {
                                FontStyleHelper._styles[Assets.FontStyle[style]] = style;
                            }
                        }
                    };

                    FontStyleHelper.Get = function (style) {
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
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
