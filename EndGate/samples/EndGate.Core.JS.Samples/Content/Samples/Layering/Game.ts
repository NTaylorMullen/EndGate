/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="World.ts" />
/// <reference path="LayerController.ts" />

// Wrap in module to keep code out of global scope
module Layering {

    export class Game extends eg.Game {
        private _world: World;
        private _layerController: LayerController;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);

            this._world = new World(this.Scene, new eg.Vector2d(canvas.width / 2, canvas.height / 2));
            this._layerController = new LayerController(this._world);
        }
    }

}