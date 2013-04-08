/// <reference path="../Interfaces/Interfaces.d.ts" />
/// <reference path="LooperCallback.ts" />

module EndGate.Core.Utilities {

    export class Looper implements IDisposable, ITyped {
        public _type: string = "Looper";

        private _running: bool;
        private _callbacks: { [s: number]: LooperCallback; };

        constructor() {
            this._running = false;
            this._callbacks = <{ [s: number]: Utilities.LooperCallback; } >{};
        }

        public AddCallback(looperCallback: LooperCallback): void {
            this._callbacks[looperCallback.ID] = looperCallback;

            if (this._running) {
                this.Loop(looperCallback);
            }
        }

        public RemoveCallback(looperCallback: LooperCallback): void {
            if (this._callbacks[looperCallback.ID]) {
                window.clearTimeout(looperCallback.TimeoutID);
                delete this._callbacks[looperCallback.ID];
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
            for (var id in this._callbacks) {
                this.Loop(this._callbacks[id]);
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
            for (var key in this._callbacks) {
                this.RemoveCallback(this._callbacks[key]);
            }

            this._callbacks = <{ [s: number]: Utilities.LooperCallback; } >{};
            this._running = false;
        }
    }
}