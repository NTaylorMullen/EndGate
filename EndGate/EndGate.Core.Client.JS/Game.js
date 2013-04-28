var EndGate;
(function (EndGate) {
    (function (Core) {
        var Game = (function () {
            function Game(gameCanvas) {
                var _this = this;
                this._type = "Game";
                this._gameTime = new Core.GameTime();
                this.ID = Game._gameIds++;
                this.Scene = new Core.Rendering.Scene2d(gameCanvas, function (context) {
                    _this.Draw(context);
                });
                this.Input = new Core.Input.InputManager(this.Scene.DrawArea);
                this.Audio = new Core.AudioManagement.AudioManager();
                this.CollisionManager = new Core.Collision.CollisionManager();
                this.Configuration = new Core.GameConfiguration(GameRunnerInstance.Register(this));
            }
            Game._gameIds = 0;
            Game.prototype.PrepareUpdate = function () {
                this._gameTime.Update();
                this.CollisionManager.Update(this._gameTime);
                this.Update(this._gameTime);
            };
            Game.prototype.Update = function (gameTime) {
            };
            Game.prototype.PrepareDraw = function () {
                this.Scene.Draw();
            };
            Game.prototype.Draw = function (context) {
            };
            Game.prototype.Dispose = function () {
                this.Scene.Dispose();
                GameRunnerInstance.Unregister(this);
            };
            return Game;
        })();
        Core.Game = Game;        
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Game.js.map
