/// <reference path="Interfaces/IDisposable.ts" />
/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Interfaces/IUpdateable.ts" />
/// <reference path="Rendering/IRenderable.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="Collision/CollisionManager.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Input/InputManager.ts" />
/// <reference path="Sound/AudioManager.ts" />
/// <reference path="Map/MapManager.ts" />
var eg;
(function (eg) {
    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    var Game = (function () {
        function Game(gameCanvas) {
            var _this = this;
            this._type = "Game";
            this._gameTime = new eg.GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new eg.Rendering.Scene2d(function (context) {
                _this.Draw(context);
            }, gameCanvas);

            this.Input = new eg.Input.InputManager(this.Scene.DrawArea);
            this.Audio = new eg.Sound.AudioManager();
            this.CollisionManager = new eg.Collision.CollisionManager();
            this.Configuration = new eg.GameConfiguration(GameRunnerInstance.Register(this));
            this.Map = new eg.Map.MapManager(this.Scene);
        }
        Game.prototype._PrepareUpdate = function () {
            this._gameTime.Update();

            this.CollisionManager.Update(this._gameTime);
            this.Update(this._gameTime);
        };

        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        Game.prototype.Update = function (gameTime) {
        };

        Game.prototype._PrepareDraw = function () {
            this.Map.Scenery.Draw();
            this.Scene.Draw();
        };

        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        Game.prototype.Draw = function (context) {
        };

        /**
        * Removes game canvas and disposes all tracked objects.
        */
        Game.prototype.Dispose = function () {
            this.Scene.Dispose();
            GameRunnerInstance.Unregister(this);
        };
        Game._gameIds = 0;
        return Game;
    })();
    eg.Game = Game;
})(eg || (eg = {}));
