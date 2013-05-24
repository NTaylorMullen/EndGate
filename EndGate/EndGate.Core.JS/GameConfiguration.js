var EndGate;
(function (EndGate) {
    var GameConfiguration = (function () {
        function GameConfiguration(updateRateSetter) {
            this._defaultUpdateRate = 40;
            this._updateRateSetter = updateRateSetter;
            this.UpdateRate(this._defaultUpdateRate);
        }
        GameConfiguration.prototype.UpdateRate = function (updateRate) {
            if(typeof updateRate !== "undefined") {
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
