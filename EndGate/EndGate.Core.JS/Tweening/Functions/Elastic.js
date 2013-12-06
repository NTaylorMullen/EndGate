/// <reference path="ITweeningFunction.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        (function (Functions) {
            /**
            * Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
            */
            var Elastic = (function () {
                function Elastic() {
                }
                Object.defineProperty(Elastic, "EaseIn", {
                    /**
                    * Gets the Elastic EaseIn function.
                    */
                    get: function () {
                        return Elastic._easeIn;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseOut", {
                    /**
                    * Gets the Elastic EaseOut function.
                    */
                    get: function () {
                        return Elastic._easeOut;
                    },
                    enumerable: true,
                    configurable: true
                });

                Object.defineProperty(Elastic, "EaseInOut", {
                    /**
                    * Gets the Elastic EaseInOut function.
                    */
                    get: function () {
                        return Elastic._easeInOut;
                    },
                    enumerable: true,
                    configurable: true
                });
                Elastic._easeIn = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }
                    if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * .3;
                    timePartialQuarter = timePartial / 4;

                    return -(change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
                };
                Elastic._easeOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }

                    if ((elapsedMilliseconds /= duration.Milliseconds) === 1) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * .3;
                    timePartialQuarter = timePartial / 4;

                    return (change * Math.pow(2, -10 * elapsedMilliseconds) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) + change + from);
                };
                Elastic._easeInOut = function (from, to, elapsed, duration) {
                    var change = to - from, elapsedMilliseconds = elapsed.Milliseconds, timePartial, timePartialQuarter;

                    if (elapsedMilliseconds === 0) {
                        return from;
                    }

                    if ((elapsedMilliseconds /= duration.Milliseconds / 2) === 2) {
                        return from + change;
                    }

                    timePartial = duration.Milliseconds * (.3 * 1.5);
                    timePartialQuarter = timePartial / 4;

                    if (elapsedMilliseconds < 1) {
                        return -.5 * (change * Math.pow(2, 10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial)) + from;
                    }
                    return (change * Math.pow(2, -10 * (elapsedMilliseconds -= 1)) * Math.sin((elapsedMilliseconds * duration.Milliseconds - timePartialQuarter) * (2 * Math.PI) / timePartial) * .5 + change + from);
                };
                return Elastic;
            })();
            Functions.Elastic = Elastic;
        })(Tweening.Functions || (Tweening.Functions = {}));
        var Functions = Tweening.Functions;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
