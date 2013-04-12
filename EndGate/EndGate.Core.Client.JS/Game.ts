/// <reference path="Interfaces/IDisposable.d.ts" />
/// <reference path="Interfaces/ITyped.d.ts" />
/// <reference path="Interfaces/IUpdateable.d.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />
/// <reference path="Collision/CollisionManager.ts" />

module EndGate.Core {

    export class Game implements ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;
        public CollisionManager: Collision.CollisionManager;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor() {
            this._gameTime = new GameTime();
            this.ID = Game._gameIds++;

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

        public Dispose()
        {
            GameRunnerInstance.Unregister(this);
        }
    }

}