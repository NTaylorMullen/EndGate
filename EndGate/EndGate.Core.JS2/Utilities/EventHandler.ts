/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />

module EndGate {

    export class EventHandler implements _.ITyped {
        public _type: string = "Event";

        private _actions: Function[];
        private _hasBindings: bool;

        constructor() {
            this._actions = [];
            this._hasBindings = false;
        }

        public Bind(action: Function): void {
            this._actions.push(action);
            this._hasBindings = true;
        }

        public Unbind(action: Function): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);

                    this._hasBindings = this._actions.length > 0;
                    return;
                }
            }
        }

        public HasBindings(): bool {
            return this._hasBindings;
        }

        public Trigger(...args: any[]): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i].apply(this, args);
            }
        }
    }

}