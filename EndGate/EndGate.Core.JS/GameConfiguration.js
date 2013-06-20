var EndGate;
(function (EndGate) {
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
            this.UpdateRate(this._defaultUpdateRate);
        }
        GameConfiguration.prototype.UpdateRate = function (updateRate) {
            if (typeof updateRate !== "undefined") {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            } else {
                return this._updateRate;
            }
        };
        return GameConfiguration;
    })();
    EndGate.GameConfiguration = GameConfiguration;
})(EndGate || (EndGate = {}));
