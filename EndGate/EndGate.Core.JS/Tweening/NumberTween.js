var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="Tween.ts" />
    /// <reference path="../Extensions/NumberExtensions.ts" />
    (function (Tweening) {
        /**
        * Defines a NumberTween class that is used to move a number from a start value to an end value.
        */
        var NumberTween = (function (_super) {
            __extends(NumberTween, _super);
            /**
            * Creates a new instance of the NumberTween object.
            * @param from Start number.
            * @param to End number.
            * @param duration How fast to move the current number from start to end.
            * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
            */
            function NumberTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            NumberTween.prototype._UpdateTween = function () {
                this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
            };
            return NumberTween;
        })(Tweening.Tween);
        Tweening.NumberTween = NumberTween;
    })(eg.Tweening || (eg.Tweening = {}));
    var Tweening = eg.Tweening;
})(eg || (eg = {}));
