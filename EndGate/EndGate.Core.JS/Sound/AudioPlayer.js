var EndGate;
(function (EndGate) {
    /// <reference path="AudioClip.ts" />
    /// <reference path="AudioSettings.ts" />
    (function (Sound) {
        var AudioPlayer = (function () {
            function AudioPlayer(sourceLocation) {
                this._source = sourceLocation;
            }
            AudioPlayer.prototype.Play = function (settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                var clip = new Sound.AudioClip(this._source, settings);
                clip.Play();
                return clip;
            };
            return AudioPlayer;
        })();
        Sound.AudioPlayer = AudioPlayer;        
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
