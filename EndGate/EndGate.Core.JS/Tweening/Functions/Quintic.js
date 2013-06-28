var eg;
(function (eg) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Quintic = (function () {
                function Quintic() {
                }
                Object.defineProperty(Quintic, "EaseIn", {
                    get: /**
                    * Gets the Quintic EaseIn function.
                    */
                    function () {
                        return Quintic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseOut", {
                    get: /**
                    * Gets the Quintic EaseOut function.
                    */
                    function () {
                        return Quintic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quintic, "EaseInOut", {
                    get: /**
                    * Gets the Quintic EaseInOut function.
                    */
                    function () {
                        return Quintic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quintic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quintic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Quintic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Quintic;
            })();
            Functions.Quintic = Quintic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(eg.Tweening || (eg.Tweening = {}));
    var Tweening = eg.Tweening;
})(eg || (eg = {}));
