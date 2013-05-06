var EndGate;
(function (EndGate) {
    var Game = (function () {
        function Game(gameCanvas) {
            var _this = this;
            this._type = "Game";
            this._gameTime = new EndGate.GameTime();
            this.ID = Game._gameIds++;
            this.Scene = new EndGate.Rendering.Scene2d(gameCanvas, function (context) {
                _this.Draw(context);
            });
            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Audio = new EndGate.Sound.AudioManager();
            this.CollisionManager = new EndGate.Collision.CollisionManager();
            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this));
            this.Map = new EndGate.Map.MapManager(this.Scene.DrawArea, this.Scene.Camera);
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
            this.Map.Scenery.Draw();
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
    EndGate.Game = Game;    
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Game.js.map
