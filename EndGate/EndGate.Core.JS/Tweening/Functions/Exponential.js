var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /// <reference path="ITweeningFunction.ts" />
        (function (Functions) {
            /**
            * Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Exponential = (function () {
                function Exponential() {
                }
                Object.defineProperty(Exponential, "EaseIn", {
                    get: /**
                    * Gets the Exponential EaseIn function.
                    */
                    function () {
                        return Exponential._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseOut", {
                    get: /**
                    * Gets the Exponential EaseOut function.
                    */
                    function () {
                        return Exponential._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Exponential, "EaseInOut", {
                    get: /**
                    * Gets the Exponential EaseInOut function.
                    */
                    function () {
                        return Exponential._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Exponential._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
                };
                Exponential._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
                };
                Exponential._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    if (elapsedMilliseconds == 0) {
                        return from;
                    }
                    if (elapsedMilliseconds == duration.Milliseconds) {
                        return from + change;
                    }
                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                        return change / 2 * Math.pow(2, 10 * (elapsedMilliseconds - 1)) + from;
                    }
                    return change / 2 * (-Math.pow(2, -10 * --elapsedMilliseconds) + 2) + from;
                };
                return Exponential;
            })();
            Functions.Exponential = Exponential;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
