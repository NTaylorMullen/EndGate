/// <reference path="../Interfaces/ITyped.d.ts" />

module EndGate.Core.Utilities {

    export class LooperCallback implements ITyped {
        public _type: string = "LooperCallback";

        private static _ids: number = 0;

        constructor(fps: number, callback: Function) {
            this.Fps = fps;
            this.Callback = callback;
            this.TimeoutID = 0;
            this.ID = LooperCallback._ids++;
            this.Active = false;
        }

        public Fps: number;
        public Callback: Function;
        public TimeoutID: number;
        public ID: number;
        public Active: bool;
    }
}