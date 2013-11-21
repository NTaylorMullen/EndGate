/// <reference path="Tween.ts" />
/// <reference path="../Graphics/Color.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /**
        * Defines a ColorTween class that is used to move a number from a start value to an end value.
        */
        var ColorTween = (function (_super) {
            __extends(ColorTween, _super);
            /**
            * Creates a new instance of the ColorTween object.
            * @param from Start color.
            * @param to End color.
            * @param duration How fast to move the current color from start to end.
            * @param tweeningFunction The function to use to translate the current color from start to end.  Different functions result in different translation behavior.
            */
            function ColorTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            ColorTween.prototype._UpdateTween = function () {
                this.Current.R = this.TweeningFunction(this.From.R, this.To.R, this.Elapsed, this.Duration);
                this.Current.G = this.TweeningFunction(this.From.G, this.To.G, this.Elapsed, this.Duration);
                this.Current.B = this.TweeningFunction(this.From.B, this.To.B, this.Elapsed, this.Duration);
            };
            return ColorTween;
        })(EndGate.Tweening.Tween);
        Tweening.ColorTween = ColorTween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
