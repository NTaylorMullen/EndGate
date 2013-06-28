var eg;
(function (eg) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Cubic = (function () {
                function Cubic() {
                }
                Object.defineProperty(Cubic, "EaseIn", {
                    get: /**
                    * Gets the Cubic EaseIn function.
                    */
                    function () {
                        return Cubic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseOut", {
                    get: /**
                    * Gets the Cubic EaseOut function.
                    */
                    function () {
                        return Cubic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Cubic, "EaseInOut", {
                    get: /**
                    * Gets the Cubic EaseInOut function.
                    */
                    function () {
                        return Cubic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Cubic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Cubic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
                };
                Cubic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
                };
                return Cubic;
            })();
            Functions.Cubic = Cubic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(eg.Tweening || (eg.Tweening = {}));
    var Tweening = eg.Tweening;
})(eg || (eg = {}));
