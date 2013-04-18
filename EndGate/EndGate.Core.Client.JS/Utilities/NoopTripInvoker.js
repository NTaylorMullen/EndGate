var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var NoopTripInvoker = (function () {
                function NoopTripInvoker(action) {
                    this._invoker = NoopTripInvoker._noop;
                    this._action = action;
                }
                NoopTripInvoker._noop = function () {
                };
                NoopTripInvoker.prototype.Invoke = function () {
                    this._invoker();
                };
                NoopTripInvoker.prototype.Trip = function () {
                    this._invoker = this._action;
                };
                return NoopTripInvoker;
            })();
            Utilities.NoopTripInvoker = NoopTripInvoker;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=NoopTripInvoker.js.map
