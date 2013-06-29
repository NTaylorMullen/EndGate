/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines a Sinusoidal tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Sinusoidal {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change * Math.cos(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + change + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * Math.sin(elapsedMilliseconds / duration.Milliseconds * (Math.PI / 2)) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return -change / 2 * (Math.cos(Math.PI * elapsedMilliseconds / duration.Milliseconds) - 1) + from;
        };

        /**
        * Gets the Sinusoidal EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Sinusoidal._easeIn;
        }

        /**
        * Gets the Sinusoidal EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Sinusoidal._easeOut;
        }

        /**
        * Gets the Sinusoidal EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Sinusoidal._easeInOut;
        }
    }

}