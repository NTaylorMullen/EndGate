/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines a Quintic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quintic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };

        /**
        * Gets the Quintic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quintic._easeIn;
        }

        /**
        * Gets the Quintic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quintic._easeOut;
        }

        /**
        * Gets the Quintic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quintic._easeInOut;
        }
    }

}