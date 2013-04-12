/// <reference path="../Interfaces/IDisposable.d.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />

module EndGate.Core.Utilities {

    export class EventHandler implements ITyped {
        public _type: string = "Event";

        private _actions: Function[];

        constructor() {
            this._actions = [];
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
    }

}