/// <reference path="Interfaces/IDisposable.ts" />
/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Interfaces/IUpdateable.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="Collision/CollisionManager.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Input/InputManager.ts" />
/// <reference path="Content/ContentManager.ts" />
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

            this.Scene = new EndGate.Rendering.Scene2d(gameCanvas);

            this.Input = new EndGate.Input.InputManager(this.Scene.DrawArea);
            this.Content = new EndGate.Content.ContentManager();

            initialQuadTreeSize = this.Scene.Camera.Size;

            if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
                initialQuadTreeSize = new EndGate.Size2d(initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
            }

            this.Configuration = new EndGate.GameConfiguration(GameRunnerInstance.Register(this), initialQuadTreeSize);
            this.CollisionManager = new EndGate.Collision.CollisionManager(this.Configuration.CollisionConfiguration);

            this.Configuration.CollisionConfiguration._OnChange.Bind(function () {
                _this.CollisionManager = new EndGate.Collision.CollisionManager(_this.Configuration.CollisionConfiguration);
            });

            this._PrepareLoadContent();
        }
        Game.prototype._PrepareUpdate = function () {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
            this._updateRequired = false;
        };

        Game.prototype._PrepareLoadContent = function () {
            this.LoadContent();
        };

        /**
        * Triggered at the start of the game.  All audio sources and images should be loaded in this method.
        */
        Game.prototype.LoadContent = function () {
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

            this.Scene.Draw();
            this._updateRequired = true;

            this.Draw();
        };

        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        Game.prototype.Draw = function () {
            // This is called by the scene
        };

        /**
        * Removes game canvas and disposes all tracked objects.
        */
        Game.prototype.Dispose = function () {
            this.Scene.Dispose();
            this.CollisionManager.Dispose();
            this.Input.Dispose();

            GameRunnerInstance.Unregister(this);
        };
        Game._gameIds = 0;
        return Game;
    })();
    EndGate.Game = Game;
})(EndGate || (EndGate = {}));
