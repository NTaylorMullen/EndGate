var EndGate;
(function (EndGate) {
    /// <reference path="AudioPlayer.ts" />
    /// <reference path="AudioSettings.ts" />
    (function (Sound) {
        /**
        * Defines an audio manager that is used to preload AudioClip's that can be played at any time.
        */
        var AudioManager = (function () {
            /**
            * Creates a new instance of the AudioManager object.
            */
            function AudioManager() {
                this._audioPlayers = {
                };
            }
            AudioManager.prototype.Load = function (name, src) {
                this._audioPlayers[name] = new Sound.AudioPlayer(src);
                return this._audioPlayers[name];
            };
            AudioManager.prototype.Unload = /**
            * Unload player that is mapped to the provided name.
            * @param name The mapped name of the AudioPlayer to unload.
            */
            function (name) {
                var player = this._audioPlayers[name];
                delete this._audioPlayers[name];
                return player;
            };
            AudioManager.prototype.Play = function (name, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                return this._audioPlayers[name].Play(settings);
            };
            AudioManager.prototype.GetAudioPlayer = /**
            * Retrieves a loaded audio player under the provided name.
            * @param name The mapped name of the AudioPlayer to retrieve.
            */
            function (name) {
                return this._audioPlayers[name];
            };
            return AudioManager;
        })();
        Sound.AudioManager = AudioManager;        
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
