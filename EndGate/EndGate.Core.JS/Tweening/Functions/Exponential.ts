/// <reference path="ITweeningFunction.ts" />

module eg.Tweening.Functions {

    /**
    * Defines an Exponential tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Exponential {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return (elapsedMilliseconds == 0) ? from : change * Math.pow(2, 10 * (elapsedMilliseconds / duration.Milliseconds - 1)) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return (elapsedMilliseconds == duration.Milliseconds) ? from + change : change * (-Math.pow(2, -10 * elapsedMilliseconds / duration.Milliseconds) + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

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

        /**
        * Gets the Exponential EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Exponential._easeIn;
        }

        /**
        * Gets the Exponential EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Exponential._easeOut;
        }

        /**
        * Gets the Exponential EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Exponential._easeInOut;
        }
    }

}