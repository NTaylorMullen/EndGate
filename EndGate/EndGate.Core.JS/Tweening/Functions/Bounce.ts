/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines a Bounce tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Bounce {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            return change - Bounce.EaseOut(0, change, duration.Subtract(elapsed), duration) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds) < (1 / 2.75)) {
                return change * (7.5625 * elapsedMilliseconds * elapsedMilliseconds) + from;
            }
            else if (elapsedMilliseconds < (2 / 2.75)) {
                return change * (7.5625 * (elapsedMilliseconds -= (1.5 / 2.75)) * elapsedMilliseconds + .75) + from;
            }
            else if (elapsedMilliseconds < (2.5 / 2.75))
            {
                return change * (7.5625 * (elapsedMilliseconds -= (2.25 / 2.75)) * elapsedMilliseconds + .9375) + from;
            }
            else
            {
                return change * (7.5625 * (elapsedMilliseconds -= (2.625 / 2.75)) * elapsedMilliseconds + .984375) + from;
            }
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            if (elapsed.Milliseconds < duration.Milliseconds / 2) {
                return Bounce.EaseIn(0, change, elapsed.Multiply(2), duration) * 0.5 + from;
            }
            else {
                return Bounce.EaseOut(0, change, elapsed.Multiply(2).Subtract(duration), duration) * .5 + change * 0.5 + from;
            }
        };

        /**
        * Gets the Bounce EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Bounce._easeIn;
        }

        /**
        * Gets the Bounce EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Bounce._easeOut;
        }

        /**
        * Gets the Bounce EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Bounce._easeInOut;
        }
    }

}