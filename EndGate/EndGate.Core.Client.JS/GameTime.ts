/// <reference path="Interfaces/ITyped.d.ts" />

module EndGate.Core {

    export class GameTime implements ITyped {
        public _type: string = "GameTime";

        public Now: Date;
        // Time in milliseconds
        public Total: number;
        public Elapsed: number;
        public ElapsedSecond: number;

        // Start time in milliseconds
        private _start: number;

        constructor() {
            this.Now = new Date();
            this._start = this.Now.getTime();
        }

        public Update(): void {
            var now = new Date(),
                nowMs = now.getTime();

            this.Elapsed = nowMs - this.Now.getTime();
            this.ElapsedSecond = this.Elapsed / 1000;
            this.Total = nowMs - this._start;
            this.Now = now;
        }
    }

}