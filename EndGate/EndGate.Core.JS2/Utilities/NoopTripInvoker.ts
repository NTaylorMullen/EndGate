module EndGate._.Utilities {

    export class NoopTripInvoker {
        private static _noop: Function = () => { };
        private _invoker: Function;
        private _action: Function;

        constructor(action: Function, tripped: bool = false) {
            this._invoker = NoopTripInvoker._noop;
            this._action = action;

            if (tripped) {
                this.Trip();
            }
        }

        public Invoke(...args: any[]) {
            this._invoker.apply(this, args);
        }

        public InvokeOnce(...args: any[]) {
            this._invoker.apply(this, args);
            this.Reset();
        }

        public Trip() {
            this._invoker = this._action;
        }

        public Reset() {
            this._invoker = NoopTripInvoker._noop;
        }
    }

}
