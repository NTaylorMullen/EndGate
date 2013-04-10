var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var Looper = (function () {
                function Looper() {
                    this._type = "Looper";
                    this._running = false;
                    this._callbacks = [];
                }
                Looper.prototype.AddCallback = function (looperCallback) {
                    this._callbacks.push(looperCallback);
                    looperCallback.Active = true;
                    if(this._running) {
                        this.Loop(looperCallback);
                    }
                };
                Looper.prototype.RemoveCallback = function (looperCallback) {
                    var callbackFound = false, i;
                    for(i = 0; i < this._callbacks.length; i++) {
                        if(this._callbacks[i].ID === looperCallback.ID) {
                            callbackFound = true;
                            break;
                        }
                    }
                    if(callbackFound) {
                        window.clearTimeout(looperCallback.TimeoutID);
                        looperCallback.Active = false;
                        this._callbacks.splice(i, 1);
                    } else {
                        throw new Error("Callback does not exist.");
                    }
                };
                Looper.prototype.Start = function () {
                    this._running = true;
                    this.Run();
                };
                Looper.prototype.Run = function () {
                    for(var i = 0; i < this._callbacks.length; i++) {
                        this.Loop(this._callbacks[i]);
                    }
                };
                Looper.prototype.Loop = function (looperCallback) {
                    var that = this, msTimer = 1000 / looperCallback.Fps;
                    looperCallback.Callback();
                    if(looperCallback.Active) {
                        looperCallback.TimeoutID = window.setTimeout(function () {
                            that.Loop(looperCallback);
                        }, msTimer);
                    }
                };
                Looper.prototype.Dispose = function () {
                    for(var i = this._callbacks.length - 1; i >= 0; i--) {
                        this.RemoveCallback(this._callbacks[i]);
                    }
                    this._callbacks = [];
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
