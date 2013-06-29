/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines a Linear tweening function that has an EaseNone function that can be used with Tween's.
    */
    export class Linear {
        private static _easeNone: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from;

            return change * elapsed.Milliseconds / duration.Milliseconds + from;
        };

        /**
        * Gets the Linear EaseNone function.
        */
        public static get EaseNone(): ITweeningFunction {
            return Linear._easeNone;
        }
    }

}