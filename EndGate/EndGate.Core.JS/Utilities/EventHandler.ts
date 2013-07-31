/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />

module EndGate {

    /**
    * Defines an event handler object that can maintain bound functions and trigger them on demand.
    */
    export class EventHandler implements IDisposable, _.ITyped {
        public _type: string = "EventHandler";

        private _actions: Array<Function>;

        /**
        * Creates a new instance of the EventHandler object.
        */
        constructor() {
            this._actions = [];
        }

        /**
        * Binds the provided action to the EventHandler.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        */
        public Bind(action: Function): void {
            this._actions.push(action);
        }

        /**
        * Binds the provided action to the EventHandler for the specified number of triggers.  Once all triggers have been fired the EventHandler will unbind itself.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler Trigger.
        * @param triggerCount Number of triggers to wait before unbinding the action.
        */
        public BindFor(action: Function, triggerCount: number): void {
            var that = this,
                triggers: number = 0;

            this._actions.push(function () {
                if (++triggers >= triggerCount) {
                    that.Unbind(action);
                }

                action.apply(this, arguments);
            });
        }

        /**
        * Unbinds the provided action from the EventHandler.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: Function): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler has active bindings.
        */
        public HasBindings(): boolean {
            return this._actions.length > 0;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        */
        public Trigger(): void {
            var actions;

            if (this.HasBindings()) {
                // Clone array so unbinds happening via triggers do not affect functionality
                actions = this._actions.slice(0);

                for (var i = 0; i < actions.length; i++) {
                    actions[i]();
                }
            }
        }

        /**
        * Disposes the event handler and unbinds all bound events.
        */
        public Dispose(): void {
            // Clear the array
            this._actions = [];
        }
    }

}