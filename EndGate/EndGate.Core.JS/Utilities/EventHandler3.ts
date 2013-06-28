/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="../Interfaces/ITyped.ts" />

module eg {

    /**
    * Defines a type constrained event handler object that can maintain bound functions which take in a value T, U and V and trigger them on demand.
    */
    export class EventHandler3<T, U, V> implements _.ITyped {
        public _type: string = "Event";

        private _actions: Array<(val1: T, val2: U, val3: V) => any>;
        private _hasBindings: bool;

        /**
        * Creates a new instance of the EventHandler3 object.
        */
        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        /**
        * Binds the provided action to the EventHandler3.  Trigger will execute all bound functions.
        * @param action Function to execute on EventHandler3 Trigger.
        */
        public Bind(action: (val1: T, val2: U, val3: V) => any): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        /**
        * Unbinds the provided action from the EventHandler3.
        * @param action Function to unbind.  The action will no longer be executed when the EventHandler gets Triggered.
        */
        public Unbind(action: (val1: T, val2: U, val3: V) => any): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        /**
        * Determines if the EventHandler3 has active bindings.
        */
        public HasBindings(): bool {
            return this._hasBindings;
        }

        /**
        * Executes all bound functions and passes the provided args to each.
        * @param val1 The first argument to pass to the bound functions.
        * @param val2 The second argument to pass to the bound functions.
        * @param val3 The third argument to pass to the bound functions.
        */
        public Trigger(val1: T, val2: U, val3: V): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i](val1, val2, val3);
            }
        }
    }

}