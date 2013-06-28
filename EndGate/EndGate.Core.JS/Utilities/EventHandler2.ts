/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />

module eg {

    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T and U and trigger them on demand.
    */
    export class EventHandler2<T, U> implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<(val1: T, val2: U) => any>;
        private _hasBindings: bool;

        /**
        * Creates a new instance of the EventHandler2 object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler2.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler2 Trigger.
        */
        public Bind(action: (val1: T, val2: U) => any): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler2.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U) => any): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler2 has active bindings.
        */
        public HasBindings(): bool {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2);
            }
        }
    }

}