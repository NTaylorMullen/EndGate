var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (AudioManagement) {
            var AudioPlayer = (function () {
                function AudioPlayer(sourceLocation) {
                    this._source = sourceLocation;
                }
                AudioPlayer.prototype.Play = function (settings) {
                    if (typeof settings === "undefined") { settings = AudioManagement.AudioSettings.Default; }
                    var clip = new AudioManagement.AudioClip(this._source, settings);
                    clip.Play();
                    return clip;
                };
                return AudioPlayer;
            })();
            AudioManagement.AudioPlayer = AudioPlayer;            
        })(Core.AudioManagement || (Core.AudioManagement = {}));
        var AudioManagement = Core.AudioManagement;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=AudioPlayer.js.map
