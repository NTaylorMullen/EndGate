/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
module Texts {

    export class Game extends eg.Game {
        public Text: eg.Graphics.Text2d;

        constructor(private _canvas: HTMLCanvasElement) {
            super(_canvas);
            var that = this;

            this.Text = new eg.Graphics.Text2d(this._canvas.width / 2, this._canvas.height / 2, "Hello World!");
            this.Text.FontSettings.FontSize = "20pt";
            this.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.TimesNewRoman;
            this.Scene.Add(this.Text);
        }
    }

}
