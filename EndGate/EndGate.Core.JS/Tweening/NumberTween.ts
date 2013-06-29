/// <reference path="Tween.ts" />
/// <reference path="../Extensions/NumberExtensions.ts" />

module EndGate.Tweening {

    /**
    * Defines a NumberTween class that is used to move a number from a start value to an end value.
    */
    export class NumberTween extends Tween<number> {

        /**
        * Creates a new instance of the NumberTween object.
        * @param from Start number.
        * @param to End number.
        * @param duration How fast to move the current number from start to end.
        * @param tweeningFunction The function to use to translate the current number from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: number, to: number, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = this.TweeningFunction(this.From, this.To, this.Elapsed, this.Duration);
        }
    }

}