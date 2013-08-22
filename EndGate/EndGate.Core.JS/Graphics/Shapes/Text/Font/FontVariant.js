var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
            /**
            * Defines valid FontVariant's that can be used to change the appearance of Text2d's.
            */
            (function (FontVariant) {
                FontVariant[FontVariant["Normal"] = 0] = "Normal";
                FontVariant[FontVariant["SmallCaps"] = 1] = "SmallCaps";
            })(Assets.FontVariant || (Assets.FontVariant = {}));
            var FontVariant = Assets.FontVariant;
            ;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
