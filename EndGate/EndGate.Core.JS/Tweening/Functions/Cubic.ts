/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines a Cubic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Cubic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * elapsedMilliseconds + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * elapsedMilliseconds + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * elapsedMilliseconds * elapsedMilliseconds * elapsedMilliseconds + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * elapsedMilliseconds + 2) + from;
        };

        /**
        * Gets the Cubic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Cubic._easeIn;
        }

        /**
        * Gets the Cubic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Cubic._easeOut;
        }

        /**
        * Gets the Cubic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Cubic._easeInOut;
        }
    }

}