/// <reference path="ITweeningFunction.ts" />

module eg.Tweening.Functions {

    /**
    * Defines a Back tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Back {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * (elapsedMilliseconds /= duration.Milliseconds) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds - 1.70158) + from;
        };
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds;

            return change * ((elapsedMilliseconds = elapsedMilliseconds / duration.Milliseconds - 1) * elapsedMilliseconds * ((1.70158 + 1) * elapsedMilliseconds + 1.70158) + 1) + from;
        };
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                constant = 1.70158;

            if ((elapsedMilliseconds /= duration.Milliseconds / 2) < 1)
            {
                return change / 2 * (elapsedMilliseconds * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds - constant)) + from;
            }
            return change / 2 * ((elapsedMilliseconds -= 2) * elapsedMilliseconds * (((constant *= (1.525)) + 1) * elapsedMilliseconds + constant) + 2) + from;
        };

        /**
        * Gets the Back EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Back._easeIn;
        }

        /**
        * Gets the Back EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Back._easeOut;
        }

        /**
        * Gets the Back EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Back._easeInOut;
        }
    }

}