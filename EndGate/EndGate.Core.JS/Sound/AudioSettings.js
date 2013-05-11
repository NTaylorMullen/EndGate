var EndGate;
(function (EndGate) {
    (function (Sound) {
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
            AudioSettings.Default = new AudioSettings();
            return AudioSettings;
        })();
        Sound.AudioSettings = AudioSettings;        
    })(EndGate.Sound || (EndGate.Sound = {}));
    var Sound = EndGate.Sound;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=AudioSettings.js.map
