/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="TextAnimator.ts" />

// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
module Texts {

    export class Game extends eg.Game {
        public Text: eg.Graphics.Text2d;

        private _textAnimator: TextAnimator;

        constructor(private _canvas: HTMLCanvasElement, targetAnimators: JQuery, defaultPosition: eg.Vector2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
            super(_canvas);
            var that = this;

            this.Text = new eg.Graphics.Text2d(defaultPosition.X, defaultPosition.Y, "Hello World!");
            this.Text.FontSettings().FontSize(20);
            this.Text.FontSettings().FontFamily(eg.Graphics.Assets.FontFamily.TimesNewRoman);
            this.Scene.Add(this.Text);

            this._textAnimator = new TextAnimator(targetAnimators, defaultPosition, defaultRotation, defaultOpacity, this._syncSliders);
        }

        public Update(gameTime: eg.GameTime): void {
            this._textAnimator.ApplyAnimation(this.Text, gameTime);
        }
    }

}
