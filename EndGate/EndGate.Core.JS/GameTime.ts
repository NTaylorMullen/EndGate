/// <reference path="Interfaces/ITyped.ts" />

module EndGate {

    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    export class GameTime implements _.ITyped {
        public _type: string = "GameTime";

        /**
        * The current date time at the start of the Update.
        */
        public Now: Date;
        /**
        * Total amount of milliseconds surpassed since construction.
        */
        public Total: number;
        /**
        * Elapsed milliseconds since last Update.
        */
        public Elapsed: number;
        /**
        * Elapsed second since last Update.  It's essentially 1/Elapsed.
        */
        public ElapsedSecond: number;

        // Start time in milliseconds
        private _start: number;

        /**
        * Creates a new instance of the GameTime object.
        */
        constructor() {
            this.Now = new Date();
            this._start = this.Now.getTime();
        }

        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
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