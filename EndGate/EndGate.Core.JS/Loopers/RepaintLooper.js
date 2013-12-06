/// <reference path="ILooper.ts" />
/// <reference path="../Extensions/WindowExtensions.ts" />
/// <reference path="LooperCallback.ts" />
var EndGate;
(function (EndGate) {
    (function (_) {
        (function (Loopers) {
            // This looper uses the request animation frame to run its internal loop
            // The method has been aliased as "OnRepaintCompleted" via the WindowExtensions
            var RepaintLooper = (function () {
                function RepaintLooper() {
                    this._type = "RepaintLooper";
                    this._running = false;
                    this._callbacksModified = false;
                    this._callbacks = [];
                }
                RepaintLooper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };

                RepaintLooper.prototype.Run = function () {
                    var _this = this;
                    if (this._running) {
                        this._callbacksModified = false;

                        for (var i = 0; i < this._callbacks.length; i++) {
                            this._callbacks[i].Callback();

                            if (this._callbacksModified) {
                                break;
                            }
                        }

                        // We want to maintain the "this" context, also we need to continuously bind
                        // the method due to how the underlying native function works
                        window.OnRepaintCompleted(function () {
                            _this.Run();
                        });
                    }
                };

                RepaintLooper.prototype.AddCallback = function (looperCallback) {
                    // This doesn't necessarily need to be here (it wont do any harm) but in order for
                    // consistency sake I'm putting it in
                    this._callbacksModified = true;

                    this._callbacks.push(looperCallback);
                };

                RepaintLooper.prototype.RemoveCallback = function (looperCallback) {
                    for (var i = 0; i < this._callbacks.length; i++) {
                        if (this._callbacks[i].ID === looperCallback.ID) {
                            this._callbacksModified = true;
                            this._callbacks.splice(i, 1);
                            return;
                        }
                    }
                };

                RepaintLooper.prototype.Dispose = function () {
                    this._callbacksModified = true;
                    this._callbacks = [];
                    this._running = false;
                };
                return RepaintLooper;
            })();
            Loopers.RepaintLooper = RepaintLooper;
        })(_.Loopers || (_.Loopers = {}));
        var Loopers = _.Loopers;
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
