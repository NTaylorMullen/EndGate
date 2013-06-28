/// <reference path="Functions/ITweeningFunction.ts" />
/// <reference path="../Assets/TimeSpan.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../GameTime.ts" />

module eg.Tweening {

    /**
    * Defines a base Tween class that is used to move a value from a start value to an end value.
    */
    export class Tween<T extends ICloneable> implements IUpdateable {
        private _from: T;
        private _to: T;
        private _current: T;
        private _duration: TimeSpan;
        private _elapsed: TimeSpan;
        private _playing: boolean;
        private _tweeningFunction: Functions.ITweeningFunction;
        private _onChange: EventHandler1<T>;
        private _onComplete: EventHandler1<Tween<T>>;

        /**
        * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
        * @param from Start value.
        * @param to End value.
        * @param duration How fast to move the current value from start to end.
        * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
        */
        constructor(from: T, to: T, duration: TimeSpan, tweeningFunction: Functions.ITweeningFunction) {
            this._from = from.Clone();
            this._to = to.Clone();
            this._current = this._from.Clone();
            this._duration = duration;
            this._elapsed = TimeSpan.Zero;
            this._playing = false;
            this._onChange = new EventHandler1<T>();
            this._onComplete = new EventHandler1<Tween<T>>();
            this._tweeningFunction = tweeningFunction;
        }

        /**
        * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnChange(): EventHandler1<T> {
            return this._onChange;
        }

        /**
        * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnComplete(): EventHandler1<Tween<T>> {
            return this._onComplete;
        }

        /**
        * Gets or sets the From component of the tween.
        */
        public get From(): T {
            return this._from;
        }
        public set From(from: T) {
            this._from = from;
        }

        /**
        * Gets or sets the To component of the tween.
        */
        public get To(): T {
            return this._to;
        }
        public set To(to: T) {
            this._to = to;
        }

        /**
        * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
        */
        public get Current(): T {
            return this._current;
        }
        public set Current(current: T) {
            this._current = current;
        }

        /**
        * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
        */
        public get Duration(): TimeSpan {
            return this._duration;
        }
        public set Duration(duration: TimeSpan) {
            this._duration = duration;
        }

        /**
        * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
        */
        public get Elapsed(): TimeSpan {
            return this._elapsed.Clone();
        }

        /**
        * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
        */
        public get TweeningFunction(): Functions.ITweeningFunction {
            return this._tweeningFunction;
        }
        public set TweeningFunction(fn: Functions.ITweeningFunction) {
            this._tweeningFunction = fn;
        }

        /**
        * Determines if the tween is playing.
        */
        public IsPlaying(): boolean {
            return this._playing;
        }

        /**
        * Starts playing the tween.  The tween will only start translating the value if Update is called.
        */
        public Play(): void {
            this._playing = true;
        }

        /**
        * Pauses the tween.  Calls to update will not translate the tween when paused.
        */
        public Pause(): void {
            this._playing = false;
        }

        /**
        * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
        */
        public Reset(): void {
            this._elapsed.Milliseconds = 0;
            this._current = this._from.Clone();
        }

        /**
        * Stops the tween from playing.  This also resets the tween to its To value.
        */
        public Stop(): void {
            this._playing = false;
            this.Reset();
        }

        /**
        * Restarts the tween.  Essentially calls Reset and then Play.
        */
        public Restart(): void {
            this.Reset();
            this.Play();
        }

        /**
        * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
        */
        public Reverse(): void {
            this._elapsed = TimeSpan.Zero;
            this._to = this._from;
            this._from = this.Current.Clone();
        }

        /**
        * Updates the tweens Current and Elapsed component if the tween is playing.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: GameTime): void {
            if (!this._playing || (this._elapsed.Equivalent(this._duration)))
            {
                return;
            }

            this._elapsed = this._elapsed.Add(gameTime.Elapsed);

            if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                this._elapsed = this._duration.Clone();

                this._current = this._to.Clone();
                this._playing = false;

                this._onComplete.Trigger(this);
            }
            else
            {
                this._UpdateTween();
                this._onChange.Trigger(this._current.Clone());
            }
        }

        public _UpdateTween(): void {
            // This should be overridden
        }
    }
}