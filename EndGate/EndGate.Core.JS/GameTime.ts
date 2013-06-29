/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Assets/TimeSpan.ts" />

module EndGate {

    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    export class GameTime implements _.ITyped {
        public _type: string = "GameTime";

        // Start date
        private _start: Date;
        private _lastUpdate: Date;
        private _elapsed: TimeSpan;

        /**
        * Creates a new instance of the GameTime object.
        */
        constructor() {
            this._start = this._lastUpdate = new Date();

            this.Update();
        }

        /**
        * Gets the elapsed time since the last update.
        */
        public get Elapsed(): TimeSpan {
            return this._elapsed;
        }

        /**
        * Gets the current date time at the start of the update.
        */
        public get Now(): Date {
            return this._lastUpdate;
        }

        /**
        * Gets the total amount of time surpassed since construction.
        */
        public get Total(): TimeSpan {
            return TimeSpan.DateSpan(this._start, new Date());
        }

        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        public Update(): void {
            var now = new Date();

            this._elapsed = new TimeSpan(now.getTime() - this._lastUpdate.getTime());
            this._lastUpdate = now;
        }
    }

}