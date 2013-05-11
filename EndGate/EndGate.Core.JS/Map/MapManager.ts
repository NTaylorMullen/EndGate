/// <reference path="../Rendering/Camera/Camera2d.ts" />
/// <reference path="Scenery/SceneryHandler.ts" />

module EndGate.Map {

    export class MapManager {
        public Scenery: SceneryHandler;

        constructor(foregroundCanvas: HTMLCanvasElement, camera: Rendering.Camera2d) {
            this.Scenery = new SceneryHandler(foregroundCanvas, camera);
        }
    }

}