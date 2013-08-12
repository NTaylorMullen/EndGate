/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Sprites {

    export class Game extends eg.Game {
        public Sprite: eg.Graphics.Sprite2d;

        constructor(private _canvas: HTMLCanvasElement) {
            super(_canvas);

            this.Sprite = new eg.Graphics.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new eg.Graphics.ImageSource("/Content/Samples/Sprites/html5-logo.png", 200, 200));

            this.Scene.Add(this.Sprite);
        }
    }

}