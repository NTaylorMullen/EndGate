var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Circular = (function () {
                function Circular() {
                }
                Object.defineProperty(Circular, "EaseIn", {
                    get: /**
                    * Gets the Circular EaseIn function.
                    */
                    function () {
                        return Circular._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseOut", {
                    get: /**
                    * Gets the Circular EaseOut function.
                    */
                    function () {
                        return Circular._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Circular, "EaseInOut", {
                    get: /**
                    * Gets the Circular EaseInOut function.
                    */
                    function () {
                        return Circular._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Circular._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
                };
                Circular._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds) + from;
                };
                Circular._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
                    }
                    return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
                };
                return Circular;
            })();
            Functions.Circular = Circular;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
