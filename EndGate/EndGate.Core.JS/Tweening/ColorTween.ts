/// <reference path="Tween.ts" />
/// <reference path="../Graphics/Color.ts" />

module EndGate.Tweening {

    /**
    * Defines a ColorTween class that is used to move a number from a start value to an end value.
    */
    export class ColorTween extends Tween<Graphics.Color> {

        /**
        * Creates a new instance of the ColorTween object.
        * @param from Start color.
        * @param to End color.
        * @param duration How fast to move the current color from start to end.
        * @param tweeningFunction The function to use to translate the current color from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Graphics.Color, to: Graphics.Color, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current.R = this.TweeningFunction(this.From.R, this.To.R, this.Elapsed, this.Duration);
            this.Current.G = this.TweeningFunction(this.From.G, this.To.G, this.Elapsed, this.Duration);
            this.Current.B = this.TweeningFunction(this.From.B, this.To.B, this.Elapsed, this.Duration);
        }
    }

}