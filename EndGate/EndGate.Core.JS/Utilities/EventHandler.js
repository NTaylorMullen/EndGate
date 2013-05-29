/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    var EventHandler = (function () {
        /**
        * Creates a new instance of the EventHandler object.
        */
        function EventHandler() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        EventHandler.prototype.Bind = /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };
        EventHandler.prototype.Unbind = /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        function (action) {
            for(var i = 0; i < this._actions.length; i++) {
                if(this._actions[i] === action) {
                    this._actions.splice(i, 1);
                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };
        EventHandler.prototype.HasBindings = /**
        * Determines if the EventHandler has active bindings.
        */
        function () {
            return this._hasBindings;
        };
        EventHandler.prototype.Trigger = /**
        * Executes all bound functions and passes the provided args to each.
        * @param args Arguments to pass to each bound function.
        */
        function () {
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
    EndGate.EventHandler = EventHandler;    
})(EndGate || (EndGate = {}));
