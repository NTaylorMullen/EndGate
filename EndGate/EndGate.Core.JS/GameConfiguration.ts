module eg {

    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    export class GameConfiguration {
        private _defaultUpdateRate: number = 40;
        private _updateRateSetter: (updateRate: number) => void;
        private _updateRate: number;

        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        constructor(updateRateSetter: (updateRate: number) => void ) {
            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
        }

        /**
        * Gets the current update rate.
        */
        public get UpdateRate(): number {
            return this._updateRate;
        }

        /**
        * Sets the update rate.
        * @param updateRate The new update rate. X many updates per second.
        */
        public set UpdateRate(updateRate: number) {
            this._updateRate = updateRate;
            this._updateRateSetter(this._updateRate);
        }
    }

}