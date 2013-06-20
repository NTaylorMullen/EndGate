/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />
var eg;
(function (eg) {
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
        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        EventHandler.prototype.Bind = function (action) {
            this._actions.push(action);
            this._hasBindings = true;
        };

        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        EventHandler.prototype.Unbind = function (action) {
            var foo = this._actions[i];

            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        };

        /**
        * Determines if the EventHandler has active bindings.
        */
        EventHandler.prototype.HasBindings = function () {
            return this._hasBindings;
        };

        /**
        * Executes all bound functions and passes the provided args to each.
        */
        EventHandler.prototype.Trigger = function () {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i]();
            }
        };
        return EventHandler;
    })();
    eg.EventHandler = EventHandler;
})(eg || (eg = {}));
