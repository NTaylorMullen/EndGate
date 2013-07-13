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
        * An audio manager which is used to load, manage and play audio clips.
        */
        public Audio: Sound.AudioManager;
        /**
        * A map manager that is used to draw large Graphic2d's (Layer's) to the background.
        */
        public Map: Map.MapManager;

        public _ID: number;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        /**
        * Creates a new instance of the Game object.  A default canvas will be created that fills the DOM body.
        */
        constructor();
        /**
        * Creates a new instance of the Game object.
        * @param gameCanvas The canvas to utilize as the game area.
        */
        constructor(gameCanvas: HTMLCanvasElement);
        constructor(gameCanvas?:HTMLCanvasElement) {
            this._gameTime = new GameTime();
            this._ID = Game._gameIds++;

            this.Scene = new Rendering.Scene2d(context => {
                this.Draw(context);
            }, gameCanvas);

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.Audio = new Sound.AudioManager();
            this.CollisionManager = new Collision.CollisionManager();
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
            this.Map = new Map.MapManager(this.Scene);
        }

        public _PrepareUpdate(): void {
            this._gameTime.Update();

            this.Update(this._gameTime);
            this.CollisionManager.Update(this._gameTime);
        }

        /**
        * Triggered on a regular interval defined by the GameConfiguration.
        * @param gameTime The global game time object.  Used to represent total time running and used to track update interval elapsed speeds.
        */
        public Update(gameTime: GameTime): void {
        }

        public _PrepareDraw(): void {
            this.Map.Scenery.Draw();
            this.Scene.Draw();
        }

        /**
        * Triggered as fast as possible.  Determined by the current browsers repaint rate.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            // This is called by the scene
        }

        /**
        * Removes game canvas and disposes all tracked objects.
        */
        public Dispose()
        {
            this.Scene.Dispose();
            this.Map.Dispose();
            GameRunnerInstance.Unregister(this);
        }
    }

}