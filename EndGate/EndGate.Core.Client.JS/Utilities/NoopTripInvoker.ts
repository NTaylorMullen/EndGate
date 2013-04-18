module EndGate.Core.Utilities {

    export class NoopTripInvoker {
        private static _noop: Function = () => { };
        private _invoker: Function;
        private _action: Function;

        constructor(action: Function) {
            this._invoker = NoopTripInvoker._noop;
            this._action = action;
        }

        public Invoke(...args: any[]) {
            this._invoker.apply(this, args);
        }

        public Trip() {
            this._invoker = this._action;
        }

        public Reset() {
            this._invoker = NoopTripInvoker._noop;
        }
    }

}
