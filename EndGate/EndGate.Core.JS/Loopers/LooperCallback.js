var eg;
(function (eg) {
    (function (_) {
        /// <reference path="../Interfaces/ITyped.ts" />
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
    })(eg._ || (eg._ = {}));
    var _ = eg._;
})(eg || (eg = {}));
