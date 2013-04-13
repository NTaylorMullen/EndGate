var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Loopers) {
            var LooperCallback = (function () {
                function LooperCallback(callback) {
                    this._type = "LooperCallback";
                    this.Callback = callback;
                    this.ID = LooperCallback._ids++;
                }
                LooperCallback._ids = 0;
                return LooperCallback;
            })();
            Loopers.LooperCallback = LooperCallback;            
        })(Core.Loopers || (Core.Loopers = {}));
        var Loopers = Core.Loopers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
