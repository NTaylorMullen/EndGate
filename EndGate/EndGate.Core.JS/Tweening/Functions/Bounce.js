/// <reference path="ITweeningFunction.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            /**
            * Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Bounce = (function () {
                function Bounce() {
                }
                Object.defineProperty(Bounce, "EaseIn", {
                    /**
                    * Gets the Bounce EaseIn function.
                    */
                    get: function () {
                        return Bounce._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseOut", {
                    /**
                    * Gets the Bounce EaseOut function.
                    */
                    get: function () {
                        return Bounce._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Bounce, "EaseInOut", {
                    /**
                    * Gets the Bounce EaseInOut function.
                    */
                    get: function () {
                        return Bounce._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Bounce._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
                };
                Bounce._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                        return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
                    } else if (elapsedMilliseconds < (2 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
                    } else if (elapsedMilliseconds < (2.5 / 2.75)) {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
                    } else {
                        return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
                    }
                };
                Bounce._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from;

                    if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                        return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
                    } else {
                        return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
                    }
                };
                return Bounce;
            })();
            Functions.Bounce = Bounce;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
