/// <reference path="Tween.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />

module EndGate.Tweening {

    /**
    * Defines a Vector2dTween class that is used to move a Vector2d from a start value to an end value.
    */
    export class Vector2dTween extends Tween<Vector2d> {

        /**
        * Creates a new instance of the Vector2dTween object.
        * @param from Start Vector2d.
        * @param to End Vector2d.
        * @param duration How fast to move the current Vector2d from start to end.
        * @param tweeningFunction The function to use to translate the current Vector2d from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: Vector2d, to: Vector2d, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            super(from, to, duration, tweeningFunction);
        }

        public _UpdateTween(): void {
            this.Current = new Vector2d(
                this.TweeningFunction(this.From.X, this.To.X, this.Elapsed, this.Duration),
                this.TweeningFunction(this.From.Y, this.To.Y, this.Elapsed, this.Duration));
        }
    }

}