/// <reference path="../../Rendering/Camera/Camera2d.ts" />
/// <reference path="../../Rendering/Scene2d.ts" />
/// <reference path="../../Rendering/Camera/Camera2dRenderer.ts" />
/// <reference path="../../Rendering/IRenderer.ts" />
/// <reference path="../../Graphics/Graphic2d.ts" />

module eg.Map {

    /**
    * Defines a SceneryHandler which specializes in drawing large background type layers to depict scenery.
    */
    export class SceneryHandler {
        private _sceneryCanvas: HTMLCanvasElement;
        private _camera: Rendering.Camera2d;
        private _layers: Graphics.Abstractions.Graphic2d[];
        private _renderer: Rendering.Camera2dRenderer;

        /**
        * Creates a new instance of the SceneryHandler object.
        * @param scene The primary scene that this SceneryHandler will play behind.
        */
        constructor(scene: Rendering.Scene2d) {
            this._camera = scene.Camera;
            this._layers = [];            
            this._sceneryCanvas = this.BuildSceneryCanvas(scene.DrawArea);
            this._renderer = new Rendering.Camera2dRenderer(this._sceneryCanvas,this._camera);
        }

        /**
        * Adds a layer to the scenery.
        * @param layer The layer to add.
        */
        public AddLayer(layer: Graphics.Abstractions.Graphic2d): void {
            this._layers.push(layer);
        }

        /**
        * Removes a layer from the scenery.
        * @param layer The layer to remove.
        */
        public RemoveLayer(layer: Graphics.Abstractions.Graphic2d): void {
            this._layers.splice(this._layers.indexOf(layer), 1);
        }

        /**
        * Draws all layers onto the given context.  If this is used via a MapManager object, Draw will automatically be called.
        */
        public Draw(): void {
            this._layers.sort(Graphics.Abstractions.Graphic2d._zindexSort);

            this._renderer.Render(this._layers);
        }

        private BuildSceneryCanvas(foreground: HTMLCanvasElement): HTMLCanvasElement {
            var sceneryCanvas = < HTMLCanvasElement > document.createElement("canvas"),
                baseElement: any = foreground;

            sceneryCanvas.width = foreground.width;
            sceneryCanvas.height = foreground.height;
            sceneryCanvas.style.position = "absolute";
            sceneryCanvas.style.zIndex = "1";

            foreground.parentElement.insertBefore(sceneryCanvas, foreground);

            return sceneryCanvas;
        }
    }

}