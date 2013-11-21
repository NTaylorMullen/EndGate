/// <reference path="../Interfaces/ICloneable.ts" />
var EndGate;
(function (EndGate) {
    (function (Sound) {
        /**
        * Defines a set of settings that are used to play AudioClip's a custom way.
        */
        var AudioSettings = (function () {
            function AudioSettings(repeat, volume, autoplay, preload) {
                if (typeof repeat === "undefined") { repeat = false; }
                if (typeof volume === "undefined") { volume = 100; }
                if (typeof autoplay === "undefined") { autoplay = false; }
                if (typeof preload === "undefined") { preload = "auto"; }
                this.Repeat = repeat;
                this.Volume = volume;
                this.AutoPlay = autoplay;
                this.Preload = preload;
            }
            /**
            * Returns a new AudioSettings object that is identical to the current AudioSettings object.
            */
            AudioSettings.prototype.Clone = function () {
                return new AudioSettings(this.Repeat, this.Volume, this.AutoPlay, this.Preload);
            };
            AudioSettings.Default = new AudioSettings();
            return AudioSettings;
        })();
        Sound.AudioSettings = AudioSettings;
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
