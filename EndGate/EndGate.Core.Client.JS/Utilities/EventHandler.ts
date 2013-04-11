/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />

module EndGate.Core.Utilities {

    export class EventHandler implements IDisposable, ITyped {
        public _type: string = "Event";

        private _actions: Function[];
        private _disposed: bool;

        constructor() {
            this._actions = [];
            this._disposed = false;
        }

        public Bind(action: Function): void {
            this._actions.push(action);
        }

        public Unbind(action: Function): void {
            for (var i = 0; i < this._actions.length; i++) {
                if (this._actions[i] === action) {
                    this._actions.splice(i, 1);
                    return;
                }
            }
        }

        public Trigger(...args: any[]): void {
            for (var i = 0; i < this._actions.length; i++) {
                this._actions[i].apply(this, args);
            }
        }

        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;
                this._actions = [];
            }
            else {
                throw new Error("Cannot dispose Event twice.");
            }
        }
    }

}