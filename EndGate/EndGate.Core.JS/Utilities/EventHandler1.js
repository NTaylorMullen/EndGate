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
            this._type = "EventHandler1";
            this._actions = [];
        }
        /**
        * Binds the provided action to the EventHandler1.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        EventHandler1.prototype.Bind = function (action) {
            this._actions.push(action);
        };

        /**
        * Binds the provided action to the EventHandler1 for the specified number of triggers.  Once all triggers have been fired the action will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        EventHandler1.prototype.BindFor = function (action, triggerCount) {
            var that = this, triggers = 0, wire = function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(wire);
                }

                action.apply(this, arguments);
            };

            this._actions.push(wire);
        };

        /**
        * Unbinds the provided action from the EventHandler1.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler1.prototype.Unbind = function (action) {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler1 has active bindings.
        */
        EventHandler1.prototype.HasBindings = function () {
            return this._actions.length > 0;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val The argument to pass to the bound functions.
        */
        EventHandler1.prototype.Trigger = function (val) {
            var actions;

            if (this.HasBindings()) {
                // Clone array so unbinds happening via triggers do not affect functionality
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i](val);
                }
            }
        };

        /**
        * Disposes the event handler and unbinds all bound events.
        */
        EventHandler1.prototype.Dispose = function () {
            // Clear the array
            this._actions = [];
        };
        return EventHandler1;
    })();
    EndGate.EventHandler1 = EventHandler1;
})(EndGate || (EndGate = {}));
