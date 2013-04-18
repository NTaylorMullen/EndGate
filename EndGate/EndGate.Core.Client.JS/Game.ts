/// <reference path="Interfaces/IDisposable.d.ts" />
/// <reference path="Interfaces/ITyped.d.ts" />
/// <reference path="Interfaces/IUpdateable.d.ts" />
/// <reference path="Rendering/IRenderable.d.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="Collision/CollisionManager.ts" />
/// <reference path="Rendering/Scene.ts" />
/// <reference path="Input/InputManager.ts" />

module EndGate.Core {

    export class Game implements ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;
        public CollisionManager: Collision.CollisionManager;
        public Scene: Rendering.Scene;
        public Input: Input.InputManager;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor(gameCanvas?:HTMLCanvasElement) {
            this._gameTime = new GameTime();
            // Call draw on Game LAST
            this.ID = Game._gameIds++;

            this.Scene = new Rendering.Scene(gameCanvas, context => {
                this.Draw(context);
            });

            this.Input = new Input.InputManager(this.Scene.DrawArea);
            this.CollisionManager = new Collision.CollisionManager();
            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
        }

        public PrepareUpdate(): void {
            this._gameTime.Update();

            this.CollisionManager.Update(this._gameTime);
            this.Update(this._gameTime);
        }

        public Update(gameTime: GameTime): void {
        }

        public PrepareDraw(): void {
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