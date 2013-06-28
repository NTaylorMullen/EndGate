/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="UI.ts" />
/// <reference path="TweenManager.ts" />

// Wrap in module to keep code out of global scope
module Tweening {

    export class Game extends eg.Game {
        private static _sideOffset: number = 150;

        private _ui: UI;
        private _object: eg.Graphics.Rectangle;
        private _tweenManager: TweenManager;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);

            this._ui = new UI();
            // This rectangle will be the object that is tweened.
            this._object = new eg.Graphics.Rectangle(Game._sideOffset, canvas.height / 2, 100, 70, "blue");

            // Build a Tween manager. Pass in the target object to apply all tweens to and pass in an
            // onTweenComplete function.  After a tween completes we need to re-enable the UI.
            this._tweenManager = new TweenManager(this._object, () => {
                // Enable the Play button.
                this._ui.Enable();
            });

            this._ui.OnPlay.Bind((tweenType: string, duration: eg.TimeSpan, tweenFunction: eg.Tweening.Functions.ITweeningFunction) => {
                // Disable the Play button.
                this._ui.Disable();

                // Pass the Play onto the tween manager so it can trigger the current animation.
                this._tweenManager.Play(tweenType, duration, tweenFunction);
            });

            // Draw the object that will be tweened.
            this.Scene.Add(this._object);
        }

        public Update(gameTime: eg.GameTime): void {
            this._tweenManager.Update(gameTime);
        }
    }

}