var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var LooperCallback = (function () {
                function LooperCallback(fps, callback) {
                    this._type = "LooperCallback";
                    this.Fps = fps;
                    this.Callback = callback;
                    this.TimeoutID = 0;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Utilities.LooperCallback = LooperCallback;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
