/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var eg;
(function (eg) {
    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
    */
    var EventHandler2 = (function () {
        /**
        * Creates a new instance of the EventHandler object.
        */
        function EventHandler2() {
            this._type = "Event";
            this._actions = [];
            this._hasBindings = false;
        }
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        EventHandler2.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler2.prototype.Unbind = function (action) {
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
        EventHandler2.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        */
        EventHandler2.prototype.Trigger = function (val1, val2) {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2);
            }
        };
        return EventHandler2;
    })();
    eg.EventHandler2 = EventHandler2;
})(eg || (eg = {}));
