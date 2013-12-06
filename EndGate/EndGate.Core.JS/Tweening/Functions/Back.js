/// <reference path="ITweeningFunction.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            /**
            * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Back = (function () {
                function Back() {
                }
                Object.defineProperty(Back, "EaseIn", {
                    /**
                    * Gets the Back EaseIn function.
                    */
                    get: function () {
                        return Back._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseOut", {
                    /**
                    * Gets the Back EaseOut function.
                    */
                    get: function () {
                        return Back._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Back, "EaseInOut", {
                    /**
                    * Gets the Back EaseInOut function.
                    */
                    get: function () {
                        return Back._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Back._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
                };
                Back._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
                };
                Back._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, constant = 1.70158;

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
                    }
                    return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
                };
                return Back;
            })();
            Functions.Back = Back;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
