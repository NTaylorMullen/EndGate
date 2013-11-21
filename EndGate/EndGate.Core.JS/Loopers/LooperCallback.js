/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    (function (_) {
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
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
