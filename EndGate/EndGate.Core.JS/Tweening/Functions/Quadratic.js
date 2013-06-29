var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Quadratic = (function () {
                function Quadratic() {
                }
                Object.defineProperty(Quadratic, "EaseIn", {
                    get: /**
                    * Gets the Quadratic EaseIn function.
                    */
                    function () {
                        return Quadratic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseOut", {
                    get: /**
                    * Gets the Quadratic EaseOut function.
                    */
                    function () {
                        return Quadratic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quadratic, "EaseInOut", {
                    get: /**
                    * Gets the Quadratic EaseInOut function.
                    */
                    function () {
                        return Quadratic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quadratic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
                };
                Quadratic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
                };
                Quadratic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
                    }

                    return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
                };
                return Quadratic;
            })();
            Functions.Quadratic = Quadratic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
