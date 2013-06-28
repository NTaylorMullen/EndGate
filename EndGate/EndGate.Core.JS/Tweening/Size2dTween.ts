/// <reference path="Tween.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />

module eg.Tweening {

    /**
    * Defines a Size2dTween class that is used to move a Size2d from a start value to an end value.
    */
    export class Size2dTween extends Tween<Size2d> {

        /**
        * Creates a new instance of the Size2dTween object.
        * @param from Start Size2d.
        * @param to End Size2d.
        * @param duration How fast to move the current Size2d from start to end.
        * @param tweeningFunction The function to use to translate the current Size2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Size2d, to: Size2d, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = new Size2d(
                this.TweeningFunction(this.From.Width, this.To.Width, this.Elapsed, this.Duration),
                this.TweeningFunction(this.From.Height, this.To.Height, this.Elapsed, this.Duration)
                );
        }
    }

}