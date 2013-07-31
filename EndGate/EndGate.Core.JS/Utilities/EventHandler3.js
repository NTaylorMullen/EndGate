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
            this._type = "EventHandler3";
            this._actions = [];
        }
        /**
        * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        */
        EventHandler3.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        /**
        * Binds the provided action to the EventHandler3 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        EventHandler3.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        };

        /**
        * Unbinds the provided action from the EventHandler3.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler3.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler3 has active bindings.
        */
        EventHandler3.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        * @param val3 The third argument to pass to the bound functions.
        */
        EventHandler3.prototype.Trigger = function (val1, val2, val3) {
            var actions;

            if (this.HasBindings()) {
                // Clone array so unbinds happening via triggers do not affect functionality
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val1, val2, val3);
                }
            }
        };

        /**
        * Disposes the event handler and unbinds all bound events.
        */
        EventHandler3.prototype.Dispose = function () {
            // Clear the array
            this._actions = [];
        };
        return EventHandler3;
    })();
    EndGate.EventHandler3 = EventHandler3;
})(EndGate || (EndGate = {}));
