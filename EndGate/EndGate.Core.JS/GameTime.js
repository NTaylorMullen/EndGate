/// <reference path="Interfaces/ITyped.ts" />
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
            this.Now = new Date();
            this._start = this.Now.getTime();
        }
        /**
        * Updates the game time object.  Causes the gameTime to refresh all its components.
        */
        GameTime.prototype.Update = function () {
            var now = new Date(), nowMs = now.getTime();

            this.Elapsed = nowMs - this.Now.getTime();
            this.ElapsedSecond = this.Elapsed / 1000;
            this.Total = nowMs - this._start;
            this.Now = now;
        };
        return GameTime;
    })();
    EndGate.GameTime = GameTime;
})(EndGate || (EndGate = {}));
