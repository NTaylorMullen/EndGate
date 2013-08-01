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
var EndGate;
(function (EndGate) {
    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    var Game = (function () {
        function Game(gameCanvas) {
            var _this = this;
            this._type = "Game";
            var initialQuadTreeSize, defaultMinQuadTreeSize = EndGate.Collision.CollisionConfiguration._DefaultMinQuadTreeNodeSize;

            this._updateRequired = true;
            this._gameTime = new EndGate.GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new EndGate.Rendering.Scene2d(function (context) {
                _this.Draw(context);
            }, gameCanvas);

            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Audio = new EndGate.Sound.AudioManager();

            initialQuadTreeSize = this.Scene.Camera.Size;

            if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
                initialQuadTreeSize = new EndGate.Size2d(initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
            }

            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this), initialQuadTreeSize);
            this.CollisionManager = new EndGate.Collision.CollisionManager(this.Configuration.CollisionConfiguration);
            this.Map = new EndGate.Map.MapManager(this.Scene);

            this.Configuration.CollisionConfiguration._OnChange.Bind(function () {
                _this.CollisionManager = new EndGate.Collision.CollisionManager(_this.Configuration.CollisionConfiguration);
            });
        }
        Game.prototype._PrepareUpdate = function () {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
            this._updateRequired = false;
        };

        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        Game.prototype.Update = function (gameTime) {
        };

        Game.prototype._PrepareDraw = function () {
            if (this.Configuration.DrawOnlyAfterUpdate && this._updateRequired) {
                return;
            }

            this.Map.Scenery.Draw();
            this.Scene.Draw();
            this._updateRequired = true;
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
            this.Map.Dispose();
            this.CollisionManager.Dispose();
            this.Input.Dispose();

            GameRunnerInstance.Unregister(this);
        };
        Game._gameIds = 0;
        return Game;
    })();
    EndGate.Game = Game;
})(EndGate || (EndGate = {}));
