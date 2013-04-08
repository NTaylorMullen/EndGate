var EndGate;
(function (EndGate) {
    (function (Core) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._callbacks = {
                };
                this._gameLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
                var updateCallback = this.CreateAndCacheCallback(game);
                this.TryLoopStart();
                this._gameLoop.AddCallback(updateCallback);
                return this.CreateUpdateRateSetter(updateCallback);
            };
            GameRunner.prototype.Unregister = function (game) {
                var updateCallback = this._callbacks[game.ID];
                this._gameLoop.RemoveCallback(updateCallback);
                this._callbackCount--;
                this.TryLoopStop();
            };
            GameRunner.prototype.TryLoopStart = function () {
                if(this._callbackCount === 1) {
                    this._gameLoop = new Core.Utilities.Looper();
                    this._gameLoop.Start();
                }
            };
            GameRunner.prototype.TryLoopStop = function () {
                if(this._callbackCount === 0 && this._gameLoop != null) {
                    this._gameLoop.Dispose();
                    this._gameLoop = null;
                }
            };
            GameRunner.prototype.CreateAndCacheCallback = function (game) {
                var updateCallback = new Core.Utilities.LooperCallback(0, game.PrepareUpdate);
                this._callbacks[game.ID] = updateCallback;
                this._callbackCount++;
                return updateCallback;
            };
            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        Core.GameRunner = GameRunner;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
var GameRunnerInstance = new EndGate.Core.GameRunner();
