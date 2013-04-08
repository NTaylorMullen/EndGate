/// <reference path="Interfaces/Interfaces.d.ts" />
/// <reference path="GameRunner.ts" />
/// <reference path="GameConfiguration.ts" />

module EndGate.Core {

    export class Game implements ITyped, IUpdateable, IDisposable {
        public _type: string = "Game";

        public ID: number;
        public Configuration: GameConfiguration;

        private static _gameIds: number = 0;
        private _gameTime: GameTime;

        constructor() {
            this._gameTime = new GameTime();
            this.ID = Game._gameIds++;

            this.Configuration = new GameConfiguration(GameRunnerInstance.Register(this))
        }

        public PrepareUpdate(): void {
            this._gameTime.Update();

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