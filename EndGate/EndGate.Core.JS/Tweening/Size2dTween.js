var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="Tween.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    (function (Tweening) {
        /**
        * Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
        */
        var Size2dTween = (function (_super) {
            __extends(Size2dTween, _super);
            /**
            * Creates a new instance of the Size2dTween object.
            * @param from Start Size2d.
            * @param to End Size2d.
            * @param duration How fast to move the current Size2d from start to end.
            * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
            */
            function Size2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Size2dTween.prototype._UpdateTween = function () {
                this.Current = new eg.Size2d(this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration));
            };
            return Size2dTween;
        })(Tweening.Tween);
        Tweening.Size2dTween = Size2dTween;
    })(eg.Tweening || (eg.Tweening = {}));
    var Tweening = eg.Tweening;
})(eg || (eg = {}));
