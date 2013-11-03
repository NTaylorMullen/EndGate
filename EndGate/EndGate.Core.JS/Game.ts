/// <reference path="Interfaces/IDisposable.ts" />
/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Interfaces/IUpdateable.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="Collision/CollisionManager.ts" />
/// <reference path="Rendering/Scene2d.ts" />
/// <reference path="Input/InputManager.ts" />
/// <reference path="Content/ContentManager.ts" />

module EndGate {

    /**
    * Defines a virtual Game object that is meant to be derived from.  Games contain a multitude of management objects to control every aspect of the game.
    */
    export class Game implements _.ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";        

        /**
        * The games configuration.  Used to modify settings such as the game update rate.
        */
        public Configuration: GameConfiguration;
        /**
        * A collision manager which is used to actively detect collisions between monitored Collidable's.
        */
        public CollisionManager: Collision.CollisionManager;
        /**
        * A scene manager which is used to draw Graphic2d's onto the game screen.
        */
        public Scene: Rendering.Scene2d;
        /**
        * An input manager which is used to monitor mouse and keyboard events.
        */
        public Input: Input.InputManager;
        /**
        * A content manager which is used to load, unload and retrieve images and audio sources.
        */
        public Content: Content.ContentManager;

        public _ID: number;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;
        private _updateRequired: boolean;

        /**
        * Creates a new instance of the Game object.  A default canvas will be created that fills the DOM body.
        */
        constructor();
        /**
        * Creates a new instance of the Game object.
        * @param gameCanvas The canvas to utilize as the game area.
        */
        constructor(gameCanvas: HTMLCanvasElement);
        constructor(gameCanvas?: HTMLCanvasElement) {
            var initialQuadTreeSize: Size2d,
                defaultMinQuadTreeSize: Size2d = Collision.CollisionConfiguration._DefaultMinQuadTreeNodeSize;

            this._updateRequired = true;
            this._gameTime = new GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new Rendering.Scene2d(gameCanvas);

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.Content = new Content.ContentManager();
            
            initialQuadTreeSize = this.Scene.Camera.Size;

            if (initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width !== 0) {
                initialQuadTreeSize = new Size2d(initialQuadTreeSize.Width % defaultMinQuadTreeSize.Width + initialQuadTreeSize.Width);
            }
            
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this), initialQuadTreeSize)
            this.CollisionManager = new Collision.CollisionManager(this.Configuration.CollisionConfiguration);

            this.Configuration.CollisionConfiguration._OnChange.Bind(() => {
                this.CollisionManager = new Collision.CollisionManager(this.Configuration.CollisionConfiguration);
            });

            this._PrepareLoadContent();
        }

        public _PrepareUpdate(): void {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
            this._updateRequired = false;
        }

        public _PrepareLoadContent(): void {
            this.LoadContent();
        }

        /**
        * Triggered at the start of the game.  All audio sources and images should be loaded in this method.
        */
        public LoadContent(): void {
        }

        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: GameTime): void {
        }

        public _PrepareDraw(): void {
            if (this.Configuration.DrawOnlyAfterUpdate && this._updateRequired) {
                return;
            }

            this.Scene.Draw();
            this._updateRequired = true;

            this.Draw();
        }

        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        public Draw(): void {
            // This is called by the scene
        }

        /**
        * Removes game canvas and disposes all tracked objects.
        */
        public Dispose(): void {
            this.Scene.Dispose();
            this.CollisionManager.Dispose();
            this.Input.Dispose();

            GameRunnerInstance.Unregister(this);
        }
    }

}