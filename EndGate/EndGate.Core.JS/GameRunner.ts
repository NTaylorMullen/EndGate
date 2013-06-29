/// <reference path="Interfaces/ITyped.ts" />
/// <reference path="Loopers/Looper.ts" />
/// <reference path="Loopers/RepaintLooper.ts" />
/// <reference path="Loopers/TimedCallback.ts" />
/// <reference path="Game.ts" />

module EndGate._ {    

    export class GameRunner implements ITyped {
        public _type: string = "GameRunner";

        private _updateCallbacks: { [id: number]: Loopers.TimedCallback; };
        private _drawCallbacks: { [id: number]: Loopers.LooperCallback; };
        private _updateLoop: Loopers.Looper;
        private _drawLoop: Loopers.RepaintLooper;
        private _callbackCount: number;

        constructor() {
            this._updateCallbacks = <{ [s: number]: Loopers.TimedCallback; } >{};
            this._drawCallbacks = <{ [s: number]: Loopers.LooperCallback; } >{};
            this._updateLoop = null;
            this._drawLoop = null;
            this._callbackCount = 0;
        }

        public Register(game: Game): (updateRate: number) => void {
            var updateCallback = this.CreateAndCacheUpdateCallback(game);
            var drawCallback = this.CreateAndCacheDrawCallback(game);

            this._callbackCount++;

            // Try to start the loop prior to adding our games callback.  This callback may be the first, hence the "Try"
            this.TryLoopStart();

            // Add our callback to the game loop (which is now running), it will now be called on an interval dictated by updateCallback
            this._updateLoop.AddCallback(updateCallback);
            this._drawLoop.AddCallback(drawCallback);

            // Updating the "updateRate" is an essential element to the game configuration.
            // If a game is running slowly we need to be able to slow down the update rate.
            return this.CreateUpdateRateSetter(updateCallback);
        }

        public Unregister(game: Game): void {
            var updateCallback,
                drawCallback;

            if (this._updateCallbacks[game._ID]) {
                updateCallback = this._updateCallbacks[game._ID];
                drawCallback = this._drawCallbacks[game._ID];

                this._updateLoop.RemoveCallback(updateCallback);
                this._drawLoop.RemoveCallback(drawCallback);
                delete this._updateCallbacks[game._ID];
                delete this._drawCallbacks[game._ID];

                this._callbackCount--

                this.TryLoopStop();
            }
        }

        private TryLoopStart(): void {
            if (this._callbackCount === 1) {
                this._updateLoop = new Loopers.Looper();
                this._updateLoop.Start();
                this._drawLoop = new Loopers.RepaintLooper();
                this._drawLoop.Start();
            }
        }

        private TryLoopStop(): void {
            if (this._callbackCount === 0 && this._updateLoop != null) {
                this._updateLoop.Dispose();
                this._updateLoop = null;
                this._drawLoop.Dispose();
                this._drawLoop = null;
            }
        }

        private CreateAndCacheUpdateCallback(game: Game): Loopers.TimedCallback {
            var updateCallback = new Loopers.TimedCallback(0, () => {
                game._PrepareUpdate();
            });

            this._updateCallbacks[game._ID] = updateCallback;            

            return updateCallback;
        }

        private CreateAndCacheDrawCallback(game: Game): Loopers.LooperCallback {
            var drawCallback = new Loopers.LooperCallback(() => {
                game._PrepareDraw();
            });

            this._drawCallbacks[game._ID] = drawCallback;

            return drawCallback;
        }

        private CreateUpdateRateSetter(callback: Loopers.TimedCallback): (updateRate: number) => void {
            return (updateRate) => {
                callback.Fps = updateRate;
            };
        }
    }
}

var GameRunnerInstance: EndGate._.GameRunner = new EndGate._.GameRunner();
