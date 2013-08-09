var EndGate;
(function (EndGate) {
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
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
