var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Utilities) {
            var EventHandler = (function () {
                function EventHandler() {
                    this._type = "Event";
                    this._actions = [];
                    this._hasBindings = false;
                }
                EventHandler.prototype.Bind = function (action) {
                    this._actions.push(action);
                    this._hasBindings = true;
                };
                EventHandler.prototype.Unbind = function (action) {
                    for(var i = 0; i < this._actions.length; i++) {
                        if(this._actions[i] === action) {
                            this._actions.splice(i, 1);
                            this._hasBindings = this._actions.length > 0;
                            return;
                        }
                    }
                };
                EventHandler.prototype.HasBindings = function () {
                    return this._hasBindings;
                };
                EventHandler.prototype.Trigger = function () {
                    var args = [];
                    for (var _i = 0; _i < (arguments.length - 0); _i++) {
                        args[_i] = arguments[_i + 0];
                    }
                    for(var i = 0; i < this._actions.length; i++) {
                        this._actions[i].apply(this, args);
                    }
                };
                return EventHandler;
            })();
            Utilities.EventHandler = EventHandler;            
        })(Core.Utilities || (Core.Utilities = {}));
        var Utilities = Core.Utilities;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=EventHandler.js.map
