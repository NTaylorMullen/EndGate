var EndGate;
(function (EndGate) {
    /// <reference path="AudioClip.ts" />
    /// <reference path="AudioSettings.ts" />
    (function (Sound) {
        /**
        * Defines an AudioPlayer that is mapped to a specific source.  Ultimately used to play the same sound simultaneously.
        */
        var AudioPlayer = (function () {
            function AudioPlayer(source) {
                if (!(source instanceof Array)) {
                    this._source = [];
                    this._source.push(source);
                } else {
                    this._source = source;
                }
            }
            AudioPlayer.prototype.BuildClip = function (settings) {
                if (typeof settings === "undefined") { settings = Sound.AudioSettings.Default; }
                return new Sound.AudioClip(this._source, settings);
            };

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
