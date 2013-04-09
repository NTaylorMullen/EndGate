/// <reference path="Interfaces/ITyped.d.ts" />
/// <reference path="Utilities/Looper.ts" />
/// <reference path="Utilities/LooperCallback.ts" />
/// <reference path="Game.ts" />

module EndGate.Core {    

    export class GameRunner implements ITyped {
        public _type: string = "GameRunner";

        private _callbacks: { [s: number]: Utilities.LooperCallback; };
        private _gameLoop: Utilities.Looper;
        private _callbackCount: number;

        constructor() {
            this._callbacks = <{ [s: number]: Utilities.LooperCallback; } >{};
            this._gameLoop = null;
            this._callbackCount = 0;
        }

        public Register(game: Game): (updateRate: number) => void {
            var updateCallback = this.CreateAndCacheCallback(game);

            // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
            this.TryLoopStart();

            // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
            this._gameLoop.AddCallback(updateCallback);

            // Updating the "updateRate" is an essential element to the game configuration.
            // If a game is running slowly we need to be able to slow down the update rate.
            return this.CreateUpdateRateSetter(updateCallback);
        }

        public Unregister(game: Game): void {
            var updateCallback;

            if (this._callbacks[game.ID]) {
                updateCallback = this._callbacks[game.ID];

                this._gameLoop.RemoveCallback(updateCallback);
                delete this._callbacks[game.ID];
                this._callbackCount--

                this.TryLoopStop();
            }
        }

        private TryLoopStart(): void {
            if (this._callbackCount === 1) {
                this._gameLoop = new Utilities.Looper();
                this._gameLoop.Start();
            }
        }

        private TryLoopStop(): void {
            if (this._callbackCount === 0 && this._gameLoop != null) {
                this._gameLoop.Dispose();
                this._gameLoop = null;
            }
        }

        private CreateAndCacheCallback(game: Game): Utilities.LooperCallback {
            var updateCallback = new Utilities.LooperCallback(0, () => {
                game.PrepareUpdate();
            });

            this._callbacks[game.ID] = updateCallback;
            this._callbackCount++;

            return updateCallback;
        };

        private CreateUpdateRateSetter(callback: Utilities.LooperCallback): (updateRate: number) => void {
            return (updateRate) => {
                callback.Fps = updateRate;
            };
        }
    }
}

var GameRunnerInstance: EndGate.Core.GameRunner = new EndGate.Core.GameRunner();