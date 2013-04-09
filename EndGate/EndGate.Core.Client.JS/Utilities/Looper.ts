/// <reference path="../Interfaces/Interfaces.d.ts" />
/// <reference path="LooperCallback.ts" />

module EndGate.Core.Utilities {

    export class Looper implements IDisposable, ITyped {
        public _type: string = "Looper";

        private _running: bool;
        private _callbacks: LooperCallback[];

        constructor() {
            this._running = false;
            this._callbacks = [];
        }

        public AddCallback(looperCallback: LooperCallback): void {
            this._callbacks.push(looperCallback);

            if (this._running) {
                this.Loop(looperCallback);
            }
        }

        public RemoveCallback(looperCallback: LooperCallback): void {
            var callbackFound: bool = false,
                i: number;

            for (i = 0; i < this._callbacks.length; i++) {
                if(this._callbacks[i].ID === looperCallback.ID) {
                    callbackFound = true;
                    break;
                }
            }


            if (callbackFound) {
                window.clearTimeout(looperCallback.TimeoutID);
                this._callbacks.splice(i, 1);
            }
            else {
                throw new Error("Callback does not exist.");
            }
        }

        public Start(): void {
            this._running = true;

            this.Run();
        }

        private Run(): void {
            for (var i = 0; i < this._callbacks.length;i++) {
                this.Loop(this._callbacks[i]);
            }
        }

        private Loop(looperCallback: LooperCallback): void {
            var that = this,
                msTimer = 1000 / looperCallback.Fps;

            looperCallback.Callback();

            looperCallback.TimeoutID = window.setTimeout(() => {
                that.Loop(looperCallback);
            }, msTimer);
        }

        public Dispose(): void {
            for (var i = this._callbacks.length - 1; i >= 0; i--) {
                this.RemoveCallback(this._callbacks[i]);
            }

            this._callbacks = [];
            this._running = false;
        }
    }
}