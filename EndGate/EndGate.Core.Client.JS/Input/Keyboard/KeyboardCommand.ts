/// <reference path="../../Interfaces/IDisposable.d.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="KeyboardCommandHelper.ts" />
/// <reference path="KeyboardModifiers.ts" />

module EndGate.Core.Input.Keyboard {

    export class KeyboardCommand implements IDisposable {
        public Key: string;
        public Action: Function;
        public Modifiers: KeyboardModifiers;

        private _onDisposeInvoker: Utilities.NoopTripInvoker;

        constructor(command: string, action: Function) {
            this.Action = action;
            this.Modifiers = KeyboardModifiers.BuildFromCommandString(command);
            this.Key = KeyboardCommandHelper.ParseKey(command);

            this.OnDispose = new Utilities.EventHandler();
            this._onDisposeInvoker = new Utilities.NoopTripInvoker(() => {
                this.OnDispose.Trigger();
            }, true);
        }

        public OnDispose: Utilities.EventHandler;

        public Dispose(): void {
            this._onDisposeInvoker.InvokeOnce();
        }
    }

}