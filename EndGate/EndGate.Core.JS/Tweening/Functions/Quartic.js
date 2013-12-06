/// <reference path="ITweeningFunction.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            /**
            * Defines a Quartic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Quartic = (function () {
                function Quartic() {
                }
                Object.defineProperty(Quartic, "EaseIn", {
                    /**
                    * Gets the Quartic EaseIn function.
                    */
                    get: function () {
                        return Quartic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseOut", {
                    /**
                    * Gets the Quartic EaseOut function.
                    */
                    get: function () {
                        return Quartic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Quartic, "EaseInOut", {
                    /**
                    * Gets the Quartic EaseInOut function.
                    */
                    get: function () {
                        return Quartic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Quartic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                };
                Quartic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 1) + from;
                };
                Quartic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
                    }
                    return -change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds - 2) + from;
                };
                return Quartic;
            })();
            Functions.Quartic = Quartic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
