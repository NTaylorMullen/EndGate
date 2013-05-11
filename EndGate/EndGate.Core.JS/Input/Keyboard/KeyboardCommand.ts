/// <reference path="../../Interfaces/IDisposable.d.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />
/// <reference path="../../Utilities/NoopTripInvoker.ts" />
/// <reference path="KeyboardCommandHelper.ts" />
/// <reference path="KeyboardModifiers.ts" />

module EndGate.Input.Assets {

    export class KeyboardCommand implements IDisposable {
        public Key: string;
        public Action: Function;
        public Modifiers: Assets.KeyboardModifiers;

        private _onDisposeInvoker: EndGate._.Utilities.NoopTripInvoker;

        constructor(command: string, action: Function) {
            this.Action = action;
            this.Modifiers = Assets.KeyboardModifiers.BuildFromCommandString(command);
            this.Key = _.KeyboardCommandHelper.ParseKey(command);

            this.OnDispose = new EventHandler();
            this._onDisposeInvoker = new EndGate._.Utilities.NoopTripInvoker(() => {
                this.OnDispose.Trigger();
            }, true);
        }

        public OnDispose: EventHandler;

        public Dispose(): void {
            this._onDisposeInvoker.InvokeOnce();
        }
    }

}