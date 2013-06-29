/// <reference path="ITweeningFunction.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines an Elastic tweening function collection that has an EaseIn, EaseOut, and EaseInOut function that can be used with Tween's.
    */
    export class Elastic {
        private static _easeIn: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

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
        private static _easeOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

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
        private static _easeInOut: ITweeningFunction = (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number => {
            var change = to - from,
                elapsedMilliseconds = elapsed.Milliseconds,
                timePartial,
                timePartialQuarter;

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

        /**
        * Gets the Elastic EaseIn function.
        */
        public static get EaseIn(): ITweeningFunction {
            return Elastic._easeIn;
        }

        /**
        * Gets the Elastic EaseOut function.
        */
        public static get EaseOut(): ITweeningFunction {
            return Elastic._easeOut;
        }

        /**
        * Gets the Elastic EaseInOut function.
        */
        public static get EaseInOut(): ITweeningFunction {
            return Elastic._easeInOut;
        }
    }

}