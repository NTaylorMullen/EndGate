var EndGate;
(function (EndGate) {
    /// <reference path="../Utilities/EventHandler1.ts" />
    /// <reference path="AudioSettings.ts" />
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
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                this._settings = settings.Clone();
                this._audio = document.createElement("audio");
                this.SetAudioSource(source);
                this.ApplySettings();

                this._onComplete = new EndGate.EventHandler1();
            }
            Object.defineProperty(AudioClip.prototype, "OnComplete", {
                get: /**
                * Gets an event that is triggered when the audio clip has completed, will not trigger if the audio clip is repeating.  Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onComplete;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(AudioClip.prototype, "Volume", {
                get: /**
                * Gets or sets the audio clip volume.
                */
                function () {
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
                if (this._audio.readyState === 0) {
                    this._audio.addEventListener("canplay", function () {
                        _this._audio.play();
                    }, true);
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
                if (this._audio.readyState === 0) {
                    this._audio.addEventListener("canplay", function () {
                        _this._audio.currentTime = time;
                    }, true);
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

            AudioClip.prototype.SetAudioSource = function (source) {
                var sourceHolder, sourceType;

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

                this._audio.addEventListener("ended", function (e) {
                    _this.OnComplete.Trigger(e);
                }, true);
            };
            return AudioClip;
        })();
        Sound.AudioClip = AudioClip;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
