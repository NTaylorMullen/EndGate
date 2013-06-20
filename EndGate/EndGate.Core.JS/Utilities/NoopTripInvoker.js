var eg;
(function (eg) {
    (function (_) {
        (function (Utilities) {
            var NoopTripInvoker = (function () {
                function NoopTripInvoker(action, tripped) {
                    if (typeof tripped === "undefined") { tripped = false; }
                    this._invoker = NoopTripInvoker._noop;
                    this._action = action;

                    if (tripped) {
                        this.Trip();
                    }
                }
                NoopTripInvoker.prototype.Invoke = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                };

                NoopTripInvoker.prototype.InvokeOnce = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    this._invoker.apply(this, args);
                    this.Reset();
                };

                NoopTripInvoker.prototype.Trip = function () {
                    this._invoker = this._action;
                };

                NoopTripInvoker.prototype.Reset = function () {
                    this._invoker = NoopTripInvoker._noop;
                };
                NoopTripInvoker._noop = function () {
                };
                return NoopTripInvoker;
            })();
            Utilities.NoopTripInvoker = NoopTripInvoker;
        })(_.Utilities || (_.Utilities = {}));
        var Utilities = _.Utilities;
    })(eg._ || (eg._ = {}));
    var _ = eg._;
})(eg || (eg = {}));
