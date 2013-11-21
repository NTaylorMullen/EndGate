/// <reference path="ITweeningFunction.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            /**
            * Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
            */
            var Linear = (function () {
                function Linear() {
                }
                Object.defineProperty(Linear, "EaseNone", {
                    /**
                    * Gets the Linear EaseNone function.
                    */
                    get: function () {
                        return Linear._easeNone;
                    },
                    enumerable: true,
                    configurable: true
                });
                Linear._easeNone = function (from, to, elapsed, duration) {
                    var change = to - from;

                    return change * elapsed.Milliseconds / duration.Milliseconds + from;
                };
                return Linear;
            })();
            Functions.Linear = Linear;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
