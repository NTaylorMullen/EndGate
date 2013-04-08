var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = {
                    };
                }
                Looper.prototype.AddCallback = function (looperCallback) {
                    this._callbacks[looperCallback.ID] = looperCallback;
                    if(this._running) {
                        this.Loop(looperCallback);
                    }
                };
                Looper.prototype.RemoveCallback = function (looperCallback) {
                    if(this._callbacks[looperCallback.ID]) {
                        window.clearTimeout(looperCallback.TimeoutID);
                        delete this._callbacks[looperCallback.ID];
                    } else {
                        throw new Error("Callback does not exist.");
                    }
                };
                Looper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                Looper.prototype.Run = function () {
                    for(var id in this._callbacks) {
                        this.Loop(this._callbacks[id]);
                    }
                };
                Looper.prototype.Loop = function (looperCallback) {
                    var that = this, msTimer = 1000 / looperCallback.Fps;
                    looperCallback.Callback();
                    looperCallback.TimeoutID = window.setTimeout(function () {
                        that.Loop(looperCallback);
                    }, msTimer);
                };
                Looper.prototype.Dispose = function () {
                    for(var key in this._callbacks) {
                        this.RemoveCallback(this._callbacks[key]);
                    }
                    this._callbacks = {
                    };
                    this._running = false;
                };
                return Looper;
            })();
            Utilities.Looper = Looper;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
