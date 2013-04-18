module EndGate.Core.Utilities {

    export class NoopTripInvoker {
        private static _noop: Function = () => { };
        private _invoker: Function;
        private _action: Function;

        constructor(action: Function) {
            this._invoker = NoopTripInvoker._noop;
            this._action = action;
        }

        public Invoke() {
            this._invoker();
        }

        public Trip() {
            this._invoker = this._action;
        }
    }

}
