/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Assets/TimeSpan.ts" />
var EndGate;
(function (EndGate) {
    /**
    * Defines a game time class that is used to manage update timing execution as well as total game time.
    */
    var GameTime = (function () {
        /**
        * Creates a new instance of the GameTime object.
        */
        function GameTime() {
            this._type = "GameTime";
            this._start = this._lastUpdate = new Date();

            this.Update();
        }
        Object.defineProperty(GameTime.prototype, "Elapsed", {
            get: /**
            * Gets the elapsed time since the last update.
            */
            function () {
                return this._elapsed;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "ElapsedSecond", {
            get: /**
            * Gets the elapsed second since the last Update.  It's essentially Elapsed.Milliseconds / 1000.
            */
            function () {
                return this._elapsedSecond;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Now", {
            get: /**
            * Gets the current date time at the start of the update.
            */
            function () {
                return this._lastUpdate;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(GameTime.prototype, "Total", {
            get: /**
            * Gets the total amount of time surpassed since construction.
            */
            function () {
                return EndGate.TimeSpan.DateSpan(this._start, new Date());
            },
            enumerable: true,
            configurable: true
        });

        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        GameTime.prototype.Update = function () {
            var now = new Date();

            this._elapsed = new EndGate.TimeSpan(now.getTime() - this._lastUpdate.getTime());
            this._elapsedSecond = this._elapsed.Milliseconds / 1000;
            this._lastUpdate = now;
        };
        return GameTime;
    })();
    EndGate.GameTime = GameTime;
})(EndGate || (EndGate = {}));
