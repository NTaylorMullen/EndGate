/// <reference path="ITweeningFunction.ts" />

module eg.Tweening.Functions {

    /**
    * Defines a Quadratic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Quadratic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * (elapsedMilliseconds /= duration.Milliseconds) * (elapsedMilliseconds - 2) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds + from;
            }

            return -change / 2 * ((--elapsedMilliseconds) * (elapsedMilliseconds - 2) - 1) + from;
        };

        /**
        * Gets the Quadratic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Quadratic._easeIn;
        }

        /**
        * Gets the Quadratic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Quadratic._easeOut;
        }

        /**
        * Gets the Quadratic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Quadratic._easeInOut;
        }
    }

}