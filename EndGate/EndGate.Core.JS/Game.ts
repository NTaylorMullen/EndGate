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

    export class Game implements _.ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;
        public CollisionManager: Collision.CollisionManager;
        public Scene: Rendering.Scene2d;
        public Input: Input.InputManager;
        public Audio: Sound.AudioManager;
        public Map: Map.MapManager;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor(gameCanvas?:HTMLCanvasElement) {
            this._gameTime = new GameTime();
            this.ID = Game._gameIds++;

            this.Scene = new Rendering.Scene2d(gameCanvas, context => {
                this.Draw(context);
            });

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.Audio = new Sound.AudioManager();
            this.CollisionManager = new Collision.CollisionManager();
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
            this.Map = new Map.MapManager(this.Scene);
        }

        public PrepareUpdate(): void {
            this._gameTime.Update();

            this.CollisionManager.Update(this._gameTime);
            this.Update(this._gameTime);
        }

        public Update(gameTime: GameTime): void {
        }

        public PrepareDraw(): void {
            this.Map.Scenery.Draw();
            this.Scene.Draw();
        }

        // This is called by the scene
        public Draw(context: CanvasRenderingContext2D): void {
        }

        public Dispose()
        {
            this.Scene.Dispose();
            GameRunnerInstance.Unregister(this);
        }
    }

}