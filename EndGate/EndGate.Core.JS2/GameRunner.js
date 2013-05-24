var EndGate;
(function (EndGate) {
    (function (_) {
        var GameRunner = (function () {
            function GameRunner() {
                this._type = "GameRunner";
                this._updateCallbacks = {
                };
                this._drawCallbacks = {
                };
                this._updateLoop = null;
                this._drawLoop = null;
                this._callbackCount = 0;
            }
            GameRunner.prototype.Register = function (game) {
                var updateCallback = this.CreateAndCacheUpdateCallback(game);
                var drawCallback = this.CreateAndCacheDrawCallback(game);
                this._callbackCount++;
                this.TryLoopStart();
                this._updateLoop.AddCallback(updateCallback);
                this._drawLoop.AddCallback(drawCallback);
                return this.CreateUpdateRateSetter(updateCallback);
            };
            GameRunner.prototype.Unregister = function (game) {
                var updateCallback, drawCallback;
                if(this._updateCallbacks[game.ID]) {
                    updateCallback = this._updateCallbacks[game.ID];
                    drawCallback = this._drawCallbacks[game.ID];
                    this._updateLoop.RemoveCallback(updateCallback);
                    this._drawLoop.RemoveCallback(drawCallback);
                    delete this._updateCallbacks[game.ID];
                    delete this._drawCallbacks[game.ID];
                    this._callbackCount--;
                    this.TryLoopStop();
                }
            };
            GameRunner.prototype.TryLoopStart = function () {
                if(this._callbackCount === 1) {
                    this._updateLoop = new _.Loopers.Looper();
                    this._updateLoop.Start();
                    this._drawLoop = new _.Loopers.RepaintLooper();
                    this._drawLoop.Start();
                }
            };
            GameRunner.prototype.TryLoopStop = function () {
                if(this._callbackCount === 0 && this._updateLoop != null) {
                    this._updateLoop.Dispose();
                    this._updateLoop = null;
                    this._drawLoop.Dispose();
                    this._drawLoop = null;
                }
            };
            GameRunner.prototype.CreateAndCacheUpdateCallback = function (game) {
                var updateCallback = new _.Loopers.TimedCallback(0, function () {
                    game.PrepareUpdate();
                });
                this._updateCallbacks[game.ID] = updateCallback;
                return updateCallback;
            };
            GameRunner.prototype.CreateAndCacheDrawCallback = function (game) {
                var drawCallback = new _.Loopers.LooperCallback(function () {
                    game.PrepareDraw();
                });
                this._drawCallbacks[game.ID] = drawCallback;
                return drawCallback;
            };
            GameRunner.prototype.CreateUpdateRateSetter = function (callback) {
                return function (updateRate) {
                    callback.Fps = updateRate;
                };
            };
            return GameRunner;
        })();
        _.GameRunner = GameRunner;        
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
var GameRunnerInstance = new EndGate._.GameRunner();
//@ sourceMappingURL=GameRunner.js.map
