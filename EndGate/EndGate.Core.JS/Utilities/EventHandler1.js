/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and trigger them on demand.
    */
    var EventHandler1 = (function () {
        /**
        * Creates a new instance of the EventHandler object.
        */
        function EventHandler1() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        EventHandler1.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler1.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler1 has active bindings.
        */
        EventHandler1.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val The argument to pass to the bound functions.
        */
        EventHandler1.prototype.Trigger = function (val) {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val);
            }
        };
        return EventHandler1;
    })();
    EndGate.EventHandler1 = EventHandler1;
})(EndGate || (EndGate = {}));
