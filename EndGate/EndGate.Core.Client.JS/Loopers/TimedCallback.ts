/// <reference path="LooperCallback.ts" />
/// <reference path="../Interfaces/ITyped.d.ts" />

module EndGate._.Loopers {

    export class TimedCallback implements ITyped extends LooperCallback {
        public _type: string = "TimedCallback";

        constructor(fps: number, callback: Function) {
            super(callback);

            this.Fps = fps;
            this.TimeoutID = 0;
            this.Active = false;
        }

        public Fps: number;
        public TimeoutID: number;
        public Active: bool;
    }

}