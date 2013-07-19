/// <reference path="Assets/Sizes/Size2d.ts" />
/// <reference path="Collision/CollisionConfiguration.ts" />
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
        function GameConfiguration(updateRateSetter, initialQuadTreeSize) {
            this._defaultUpdateRate = 40;
            this.DrawOnlyAfterUpdate = true;

            this._updateRateSetter = updateRateSetter;
            this._updateRate = this._defaultUpdateRate;
            this._collisionConfiguration = new EndGate.Collision.CollisionConfiguration(initialQuadTreeSize);
        }
        Object.defineProperty(GameConfiguration.prototype, "UpdateRate", {
            get: /**
            * Gets or sets the UpdateRate of the game.  Update rates are represented as X many updates per second.
            */
            function () {
                return this._updateRate;
            },
            set: function (updateRate) {
                this._updateRate = updateRate;
                this._updateRateSetter(this._updateRate);
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameConfiguration.prototype, "CollisionConfiguration", {
            get: /**
            * Gets the CollisionConfiguration of the game.  These configurations are used to optimize the collision management performance.
            */
            function () {
                return this._collisionConfiguration;
            },
            enumerable: true,
            configurable: true
        });
        return GameConfiguration;
    })();
    EndGate.GameConfiguration = GameConfiguration;
})(EndGate || (EndGate = {}));
