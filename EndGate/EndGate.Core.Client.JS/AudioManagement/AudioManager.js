var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (AudioManagement) {
            var AudioManager = (function () {
                function AudioManager() {
                    this._audioPlayers = {
                    };
                }
                AudioManager.prototype.Load = function (name, src) {
                    this._audioPlayers[name] = new AudioManagement.AudioPlayer(src);
                    return this._audioPlayers[name];
                };
                AudioManager.prototype.Unload = function (name) {
                    var player = this._audioPlayers[name];
                    delete this._audioPlayers[name];
                    return player;
                };
                AudioManager.prototype.Play = function (name, settings) {
                    if (typeof settings === "undefined") { settings = AudioManagement.AudioSettings.Default; }
                    return this._audioPlayers[name].Play(settings);
                };
                AudioManager.prototype.GetPlayer = function (name) {
                    return this._audioPlayers[name];
                };
                return AudioManager;
            })();
            AudioManagement.AudioManager = AudioManager;            
        })(Core.AudioManagement || (Core.AudioManagement = {}));
        var AudioManagement = Core.AudioManagement;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=AudioManager.js.map
