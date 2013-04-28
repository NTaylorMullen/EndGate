var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (AudioManagement) {
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
            AudioManagement.AudioSettings = AudioSettings;            
        })(Core.AudioManagement || (Core.AudioManagement = {}));
        var AudioManagement = Core.AudioManagement;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=AudioSettings.js.map
