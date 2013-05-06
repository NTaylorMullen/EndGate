/// <reference path="../../Rendering/Camera/Camera2d.ts" />
/// <reference path="../../Rendering/Camera/Camera2dRenderer.ts" />
/// <reference path="../../Rendering/IRenderer.d.ts" />
/// <reference path="../../Graphics/Graphic2d.ts" />

module EndGate.Map {

    export class SceneryHandler {
        private _sceneryCanvas: HTMLCanvasElement;
        private _camera: Rendering.Camera2d;
        private _layers: Graphics.Abstractions.Graphic2d[];
        private _renderer: Rendering.Camera2dRenderer;

        constructor(foregroundCanvas: HTMLCanvasElement, camera: Rendering.Camera2d) {
            this._camera = camera;
            this._layers = [];            
            this._sceneryCanvas = this.BuildSceneryCanvas(foregroundCanvas);
            this._renderer = new Rendering.Camera2dRenderer(this._sceneryCanvas,this._camera);
        }

        public AddLayer(layer: Graphics.Abstractions.Graphic2d): void {
            this._layers.push(layer);
        }

        public RemoveLayer(layer: Graphics.Abstractions.Graphic2d): void {
            this._layers.splice(this._layers.indexOf(layer), 1);
        }

        public Draw(): void {
            this._layers.sort(Graphics.Abstractions.Graphic2d._zindexSort);

            this._renderer.Render(this._layers);
        }

        private BuildSceneryCanvas(foreground: HTMLCanvasElement): HTMLCanvasElement {
            var sceneryCanvas = < HTMLCanvasElement > document.createElement("canvas"),
                baseElement: any = foreground,
                leftOffset: number,
                topOffset: number;

            // Position offset
            leftOffset = foreground.offsetLeft;
            topOffset = foreground.offsetTop;

            sceneryCanvas.width = foreground.width;
            sceneryCanvas.height = foreground.height;
            sceneryCanvas.style.position = "absolute";
            sceneryCanvas.style.left = leftOffset + "px";
            sceneryCanvas.style.top = topOffset + "px";
            sceneryCanvas.style.zIndex = "1";

            foreground.parentElement.insertBefore(sceneryCanvas, foreground);

            return sceneryCanvas;
        }
    }

}