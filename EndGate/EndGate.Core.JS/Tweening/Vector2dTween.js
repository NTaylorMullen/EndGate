var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="Tween.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    (function (Tweening) {
        /**
        * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
        */
        var Vector2dTween = (function (_super) {
            __extends(Vector2dTween, _super);
            /**
            * Creates a new instance of the Vector2dTween object.
            * @param from Start Vector2d.
            * @param to End Vector2d.
            * @param duration How fast to move the current Vector2d from start to end.
            * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
            */
            function Vector2dTween(from, to, duration, tweeningFunction) {
                _super.call(this, from, to, duration, tweeningFunction);
            }
            Vector2dTween.prototype._UpdateTween = function () {
                this.Current = new eg.Vector2d(this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration), this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
            };
            return Vector2dTween;
        })(Tweening.Tween);
        Tweening.Vector2dTween = Vector2dTween;
    })(eg.Tweening || (eg.Tweening = {}));
    var Tweening = eg.Tweening;
})(eg || (eg = {}));
