/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="AudioSettings.ts" />
var EndGate;
(function (EndGate) {
    (function (Sound) {
        var supportedAudioTypes = {
            mp3: 'audio/mpeg',
            ogg: 'audio/ogg',
            wav: 'audio/wav',
            aac: 'audio/aac',
            m4a: 'audio/x-m4a'
        };

        /**
        * Defines a single audio clip that can be played, stopped or paused.
        */
        var AudioClip = (function () {
            function AudioClip(source, settings) {
                if (typeof settings === "undefined") { settings = EndGate.Sound.AudioSettings.Default; }
                this._disposed = false;
                this._settings = settings.Clone();
                this._canPlayWires = [];

                if (source instanceof HTMLAudioElement) {
                    this._audio = source;
                } else {
                    this._audio = document.createElement("audio");
                    this.SetAudioSource(source);
                }

                this.ApplySettings();

                this._onComplete = new EndGate.EventHandler1();
            }
            Object.defineProperty(AudioClip.prototype, "OnComplete", {
                /**
                * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                get: function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AudioClip.prototype, "Volume", {
                /**
                * Gets or sets the audio clip volume.
                */
                get: function () {
                    return this._settings.Volume;
                },
                set: function (percent) {
                    this._settings.Volume = percent;
                    this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Determines if the AudioClip is currently playing.
            */
            AudioClip.prototype.IsPlaying = function () {
                return !this._audio.paused;
            };

            /**
            * Determines if the AudioClip has completed.
            */
            AudioClip.prototype.IsComplete = function () {
                return this._audio.ended;
            };

            /**
            * Plays the current audio clip.
            */
            AudioClip.prototype.Play = function () {
                var _this = this;
                var wire;

                if (this._audio.readyState === 0) {
                    wire = function () {
                        _this._audio.play();
                    };
                    this._canPlayWires.push(wire);
                    this._audio.addEventListener("canplay", wire, true);
                } else {
                    this._audio.play();
                }
            };

            /**
            * Pauses the current audio clip.
            */
            AudioClip.prototype.Pause = function () {
                this._audio.pause();
            };

            /**
            * Seeks the audio clip to the provided time.
            * @param time The time to seek to.
            */
            AudioClip.prototype.Seek = function (time) {
                var _this = this;
                var wire;

                if (this._audio.readyState === 0) {
                    wire = function () {
                        _this._audio.currentTime = time;
                    };

                    this._canPlayWires.push(wire);

                    this._audio.addEventListener("canplay", wire, true);
                } else {
                    this._audio.currentTime = time;
                }
            };

            /**
            * Stops the current audio clip and seeks back to time 0.
            */
            AudioClip.prototype.Stop = function () {
                this.Seek(0);
                this._audio.pause();
            };

            /**
            * Unbinds all events and nulls out the settings and audio component to allow for garbage collection.
            */
            AudioClip.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this._onComplete.Dispose();
                    for (var i = 0; i < this._canPlayWires.length; i++) {
                        this._audio.removeEventListener("canplay", this._canPlayWires[i], true);
                    }

                    this._audio.removeEventListener("ended", this._endedWire, true);
                    this._audio = null;
                    this._settings = null;
                } else {
                    throw new Error("Cannot dispose AudioClip more than once.");
                }
            };

            AudioClip.prototype.SetAudioSource = function (source) {
                var sourceHolder, sourceType;

                // If we've passed in a list of sources
                if (!(source instanceof Array)) {
                    source = [source];
                }

                for (var i = 0; i < source.length; i++) {
                    sourceHolder = document.createElement("source");
                    sourceHolder.src = source[i];

                    sourceType = supportedAudioTypes[source[i].split('.').pop()];

                    if (typeof sourceType !== "undefined") {
                        sourceHolder.type = sourceType;
                    }

                    this._audio.appendChild(sourceHolder);
                }
            };

            AudioClip.prototype.ApplySettings = function () {
                var _this = this;
                this._audio.loop = this._settings.Repeat;
                this._audio.autoplay = this._settings.AutoPlay;
                this._audio.preload = this._settings.Preload;
                this.Volume = this._settings.Volume;

                this._endedWire = function (e) {
                    _this.OnComplete.Trigger(e);
                };

                this._audio.addEventListener("ended", this._endedWire, true);
            };
            return AudioClip;
        })();
        Sound.AudioClip = AudioClip;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
