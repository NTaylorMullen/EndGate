/// <reference path="../Interfaces/ITyped.ts" />
/// <reference path="ILooper.ts" />
/// <reference path="TimedCallback.ts" />
var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (timedCallback) {
                    var _this = this;
                    this._callbacks.push(timedCallback);
                    timedCallback.Active = true;

                    if (this._running) {
                        // Let initial call stack unwind before initiating the loop
                        window.setTimeout(function () {
                            _this.Loop(timedCallback);
                        }, 0);
                    }
                };

                Looper.prototype.RemoveCallback = function (timedCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === timedCallback.ID) {
                            window.clearTimeout(timedCallback.TimeoutID);
                            timedCallback.Active = false;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                Looper.prototype.Start = function () {
                    this._running = true;

                    this.Run();
                };

                Looper.prototype.Run = function () {
                    var _this = this;
                    for (var i = 0; i < this._callbacks.length; i++) {
                        window.setTimeout((function (index) {
                            return function () {
                                _this.Loop(_this._callbacks[index]);
                            };
                        })(i), 0);
                    }
                };

                Looper.prototype.Loop = function (timedCallback) {
                    var that = this, msTimer = 1000 / timedCallback.Fps;

                    timedCallback.Callback();

                    if (timedCallback.Active) {
                        timedCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(timedCallback);
                        }, msTimer);
                    }
                };

                Looper.prototype.Dispose = function () {
                    for (var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }

                    this._callbacks = [];
                    this._running = false;
                };
                return Looper;
            })();
            Loopers.Looper = Looper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
