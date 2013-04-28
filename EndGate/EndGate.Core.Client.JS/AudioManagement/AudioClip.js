var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (AudioManagement) {
            var supportedAudioTypes = {
                mp3: 'audio/mpeg',
                ogg: 'audio/ogg',
                wav: 'audio/wav',
                aac: 'audio/aac',
                m4a: 'audio/x-m4a'
            };
            var AudioClip = (function () {
                function AudioClip(source, settings) {
                    if (typeof settings === "undefined") { settings = AudioManagement.AudioSettings.Default; }
                    this._settings = settings;
                    this._audio = document.createElement("audio");
                    this.SetAudioSource(source);
                    this.ApplySettings();
                    this.OnComplete = new Core.Utilities.EventHandler();
                }
                AudioClip.prototype.Volume = function (percent) {
                    if(typeof percent !== "undefined") {
                        this._settings.Volume = percent;
                        this._audio.volume = Math.max(Math.min(percent / 100, 1), 0);
                    }
                    return this._settings.Volume;
                };
                AudioClip.prototype.IsPlaying = function () {
                    return !this._audio.paused;
                };
                AudioClip.prototype.Complete = function () {
                    return this._audio.ended;
                };
                AudioClip.prototype.Play = function () {
                    var _this = this;
                    if(this._audio.readyState === 0) {
                        this._audio.addEventListener("canplay", function () {
                            _this._audio.play();
                        }, true);
                    } else {
                        this._audio.play();
                    }
                };
                AudioClip.prototype.Pause = function () {
                    this._audio.pause();
                };
                AudioClip.prototype.Seek = function (time) {
                    var _this = this;
                    if(this._audio.readyState === 0) {
                        this._audio.addEventListener("canplay", function () {
                            _this._audio.currentTime = time;
                        }, true);
                    } else {
                        this._audio.currentTime = time;
                    }
                };
                AudioClip.prototype.Stop = function () {
                    this.Seek(0);
                    this._audio.pause();
                };
                AudioClip.prototype.SetAudioSource = function (source) {
                    var sourceHolder, sourceType;
                    if(!(source instanceof Array)) {
                        source = [
                            source
                        ];
                    }
                    for(var i = 0; i < source.length; i++) {
                        sourceHolder = document.createElement("source");
                        sourceHolder.src = source[i];
                        sourceType = supportedAudioTypes[source[i].split('.').pop()];
                        if(typeof sourceType !== "undefined") {
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
                    this.Volume(this._settings.Volume);
                    this._audio.addEventListener("ended", function (e) {
                        _this.OnComplete.Trigger(e);
                    }, true);
                };
                return AudioClip;
            })();
            AudioManagement.AudioClip = AudioClip;            
        })(Core.AudioManagement || (Core.AudioManagement = {}));
        var AudioManagement = Core.AudioManagement;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=AudioClip.js.map
