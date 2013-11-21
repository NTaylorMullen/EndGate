/// <reference path="Functions/ITweeningFunction.ts" />
/// <reference path="../Assets/TimeSpan.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ICloneable.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../GameTime.ts" />
var EndGate;
(function (EndGate) {
    (function (Tweening) {
        /**
        * Defines a base Tween class that is used to move a value from a start value to an end value.
        */
        var Tween = (function () {
            /**
            * Creates a new instance of the Tween object.  This should only ever be called from derived classes via a super constructor call.
            * @param from Start value.
            * @param to End value.
            * @param duration How fast to move the current value from start to end.
            * @param tweeningFunction The function to use to translate the current value from start to end.  Different functions result in different translation behavior.
            */
            function Tween(from, to, duration, tweeningFunction) {
                this._from = from.Clone();
                this._to = to.Clone();
                this._current = this._from.Clone();
                this._duration = duration;
                this._elapsed = EndGate.TimeSpan.Zero;
                this._playing = false;
                this._onChange = new EndGate.EventHandler1();
                this._onComplete = new EndGate.EventHandler1();
                this._tweeningFunction = tweeningFunction;
            }
            Object.defineProperty(Tween.prototype, "OnChange", {
                /**
                * Gets an event that is triggered when the tween has changed its Current value, occurs directly after a tween update.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onChange;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "OnComplete", {
                /**
                * Gets an event that is triggered when the tween has completed transitioning the Current value, once triggered Elapsed will be equivalent to Duration and Current will be equivalent to To.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "From", {
                /**
                * Gets or sets the From component of the tween.
                */
                get: function () {
                    return this._from;
                },
                set: function (from) {
                    this._from = from;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "To", {
                /**
                * Gets or sets the To component of the tween.
                */
                get: function () {
                    return this._to;
                },
                set: function (to) {
                    this._to = to;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Current", {
                /**
                * Gets or sets the Current component of the tween.  The Current is the current value of the tween, the final value of Current will be equivalent to To when the tween has completed.
                */
                get: function () {
                    return this._current;
                },
                set: function (current) {
                    this._current = current;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Duration", {
                /**
                * Gets or sets the Duration component of the tween.  The Duration is how long the tween will take to go From -> To.
                */
                get: function () {
                    return this._duration;
                },
                set: function (duration) {
                    this._duration = duration;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "Elapsed", {
                /**
                * Gets or the Elapsed component of the tween.  Elapsed represents how far along the tween is.  When Elapsed equals Duration the tween is completed.
                */
                get: function () {
                    return this._elapsed.Clone();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Tween.prototype, "TweeningFunction", {
                /**
                * Gets or sets the TweeningFunction of the tween.  The TweeningFunction controls how the tween translates the Current value to the To value.
                */
                get: function () {
                    return this._tweeningFunction;
                },
                set: function (fn) {
                    this._tweeningFunction = fn;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the tween is playing.
            */
            Tween.prototype.IsPlaying = function () {
                return this._playing;
            };

            /**
            * Starts playing the tween.  The tween will only start translating the value if Update is called.
            */
            Tween.prototype.Play = function () {
                this._playing = true;
            };

            /**
            * Pauses the tween.  Calls to update will not translate the tween when paused.
            */
            Tween.prototype.Pause = function () {
                this._playing = false;
            };

            /**
            * Resets the tween to the To location and resets the Elapsed time.  This does not stop or start the tween.
            */
            Tween.prototype.Reset = function () {
                this._elapsed.Milliseconds = 0;
                this._current = this._from.Clone();
            };

            /**
            * Stops the tween from playing.  This also resets the tween to its To value.
            */
            Tween.prototype.Stop = function () {
                this._playing = false;
                this.Reset();
            };

            /**
            * Restarts the tween.  Essentially calls Reset and then Play.
            */
            Tween.prototype.Restart = function () {
                this.Reset();
                this.Play();
            };

            /**
            * Reverses the tween from the Current value back to the From value.  This changes the To component to equal the From value and the From value to equal the Current value.
            */
            Tween.prototype.Reverse = function () {
                this._elapsed = EndGate.TimeSpan.Zero;
                this._to = this._from;
                this._from = this.Current.Clone();
            };

            /**
            * Updates the tweens Current and Elapsed component if the tween is playing.
            * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
            */
            Tween.prototype.Update = function (gameTime) {
                if (!this._playing) {
                    return;
                }

                this._elapsed = this._elapsed.Add(gameTime.Elapsed);

                if (this._elapsed.Milliseconds >= this._duration.Milliseconds) {
                    this._elapsed = this._duration.Clone();

                    this._current = this._to.Clone();
                    this._playing = false;

                    this._onChange.Trigger(this._current.Clone());
                    this._onComplete.Trigger(this);
                } else {
                    this._UpdateTween();
                    this._onChange.Trigger(this._current.Clone());
                }
            };

            /**
            * Stops and unbinds all events from the tween.
            */
            Tween.prototype.Dispose = function () {
                this.Stop();
                this._onChange.Dispose();
                this._onComplete.Dispose();
            };

            Tween.prototype._UpdateTween = function () {
                // This should be overridden
            };
            return Tween;
        })();
        Tweening.Tween = Tween;
    })(EndGate.Tweening || (EndGate.Tweening = {}));
    var Tweening = EndGate.Tweening;
})(EndGate || (EndGate = {}));
