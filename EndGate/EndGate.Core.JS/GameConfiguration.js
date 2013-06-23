var eg;
(function (eg) {
    /**
    * Defines a GameConfiguration object that is used to represent the current state of a Game object.
    */
    var GameConfiguration = (function () {
        /**
        * Creates a new instance of the GameConfiguration object.
        * @param updateRateSetter A function that updates the rate of "Update" execution.
        */
        function GameConfiguration(updateRateSetter) {
            this._defaultUpdateRate = 40;
            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
        }
        Object.defineProperty(GameConfiguration.prototype, "UpdateRate", {
            get: /**
            * Gets the current update rate.
            */
            function () {
                return this._updateRate;
            },
            set: /**
            * Sets the update rate.
            * @param updateRate The new update rate. X many updates per second.
            */
            function (updateRate) {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            },
            enumerable: true,
            configurable: true
        });

        return GameConfiguration;
    })();
    eg.GameConfiguration = GameConfiguration;
})(eg || (eg = {}));
