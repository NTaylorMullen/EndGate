/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines a Circular tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Circular {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * (Math.sqrt(1 - (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds) - 1) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * Math.sqrt(1 - (elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds ) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1) {
                return -change / 2 * (Math.sqrt(1 - elapsedMilliseconds * elapsedMilliseconds) - 1) + from;
            }
            return change / 2 * (Math.sqrt(1 - (elapsedMilliseconds -= 2) * elapsedMilliseconds) + 1) + from;
        };

        /**
        * Gets the Circular EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Circular._easeIn;
        }

        /**
        * Gets the Circular EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Circular._easeOut;
        }

        /**
        * Gets the Circular EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Circular._easeInOut;
        }
    }

}