var EndGate;
(function (EndGate) {
    (function (Sound) {
        var AudioManager = (function () {
            function AudioManager() {
                this._audioPlayers = {
                };
            }
            AudioManager.prototype.Load = function (name, src) {
                this._audioPlayers[name] = new Sound.AudioPlayer(src);
                return this._audioPlayers[name];
            };
            AudioManager.prototype.Unload = function (name) {
                var player = this._audioPlayers[name];
                delete this._audioPlayers[name];
                return player;
            };
            AudioManager.prototype.Play = function (name, settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                return this._audioPlayers[name].Play(settings);
            };
            AudioManager.prototype.GetPlayer = function (name) {
                return this._audioPlayers[name];
            };
            return AudioManager;
        })();
        Sound.AudioManager = AudioManager;        
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=AudioManager.js.map
