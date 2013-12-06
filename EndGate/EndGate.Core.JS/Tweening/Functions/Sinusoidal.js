/// <reference path="ITweeningFunction.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            /**
            * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Sinusoidal = (function () {
                function Sinusoidal() {
                }
                Object.defineProperty(Sinusoidal, "EaseIn", {
                    /**
                    * Gets the Sinusoidal EaseIn function.
                    */
                    get: function () {
                        return Sinusoidal._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseOut", {
                    /**
                    * Gets the Sinusoidal EaseOut function.
                    */
                    get: function () {
                        return Sinusoidal._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Sinusoidal, "EaseInOut", {
                    /**
                    * Gets the Sinusoidal EaseInOut function.
                    */
                    get: function () {
                        return Sinusoidal._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Sinusoidal._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
                };
                Sinusoidal._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
                };
                Sinusoidal._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds;

                    return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
                };
                return Sinusoidal;
            })();
            Functions.Sinusoidal = Sinusoidal;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
