/// <reference path="../Interfaces/ITyped.d.ts" />
/// <reference path="ILooper.d.ts" />
/// <reference path="TimedCallback.ts" />

module EndGate.Core.Loopers {

    export class Looper implements ILooper {
        public _type: string = "Looper";

        private _running: bool;
        private _callbacks: TimedCallback[];

        constructor() {
            this._running = false;
            this._callbacks = [];
        }

        public AddCallback(timedCallback: TimedCallback): void {
            this._callbacks.push(timedCallback);
            timedCallback.Active = true;

            if (this._running) {
                this.Loop(timedCallback);
            }
        }

        public RemoveCallback(timedCallback: TimedCallback): void {
            for (var i = 0; i < this._callbacks.length; i++) {
                if(this._callbacks[i].ID === timedCallback.ID) {
                    window.clearTimeout(timedCallback.TimeoutID);
                    timedCallback.Active = false;
                    this._callbacks.splice(i, 1);
                    return;
                }
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

        private Loop(timedCallback: TimedCallback): void {
            var that = this,
                msTimer = 1000 / timedCallback.Fps;

            timedCallback.Callback();

            if (timedCallback.Active) {
                timedCallback.TimeoutID = window.setTimeout(() => {
                    that.Loop(timedCallback);
                }, msTimer);
            }
        }

        public Dispose(): void {
            // We need to "remove" every callback to stop each of their timeouts
            for (var i = this._callbacks.length - 1; i >= 0; i--) {
                this.RemoveCallback(this._callbacks[i]);
            }

            this._callbacks = [];
            this._running = false;
        }
    }
}