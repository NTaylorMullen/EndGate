/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T, U and V and trigger them on demand.
    */
    var EventHandler3 = (function () {
        /**
        * Creates a new instance of the EventHandler3 object.
        */
        function EventHandler3() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        */
        EventHandler3.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler3.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler3.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler3 has active bindings.
        */
        EventHandler3.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        * @param val3 The third argument to pass to the bound functions.
        */
        EventHandler3.prototype.Trigger = function (val1, val2, val3) {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2, val3);
            }
        };
        return EventHandler3;
    })();
    EndGate.EventHandler3 = EventHandler3;
})(EndGate || (EndGate = {}));
