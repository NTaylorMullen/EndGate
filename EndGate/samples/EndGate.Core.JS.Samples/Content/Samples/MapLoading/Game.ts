/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CameraController.ts" />

// Wrap in module to keep code out of global scope
module MapLoading {

    export class Game extends eg.Game {
        private _mapLayers: Array<eg.Map.SquareTileMap>;
        private _cameraController: CameraController;

        constructor(canvas: HTMLCanvasElement, mapUrlInput: JQuery, loadMapButton: JQuery) {
            super(canvas);

            this._mapLayers = new Array<eg.Map.SquareTileMap>();

            loadMapButton.click(() => {
                // Casting to any because the jquery declaration is wrong here
                // We use jquery to retrieve the map json from a url location
                (<any>$.getJSON(mapUrlInput.val(), (mapJson) => {
                    // Use the JSONLoader to load the map json
                    eg.Map.Loaders.JSONLoader.Load(mapJson, (result: eg.Map.Loaders.IMapLoadedResult) => {
                        // We get an array of square tile maps that we then need to add to the scene
                        // Note that the ZIndexes of the layers are already set from 0 - (layers.length-1)
                        this.LoadLayers(<Array<eg.Map.SquareTileMap>>result.Layers);
                    });
                })).fail(() => {
                    alert("Unable to retrieve map data from the provided url.");
                });
            });

            // Pre-load the scene with the initial json map
            loadMapButton.click();

            // This camera controller is what makes the camera move around the game map.
            this._cameraController = new CameraController(this.Scene.Camera, this.Input.Mouse);
        }

        public Update(gameTime: eg.GameTime): void {
            this._cameraController.Update(gameTime);
        }

        private LoadLayers(layers: Array<eg.Map.SquareTileMap>): void {
            // Clear all existing layers (so we can click more than once)
            for (var i = 0; i < this._mapLayers.length; i++) {
                this.Map.Scenery.RemoveLayer(this._mapLayers[i]);
            }

            if (layers) {
                this._mapLayers = layers;
            }

            // Add all of the layers to the scenery (so they're drawn)
            for (var i = 0; i < this._mapLayers.length; i++) {
                this.Map.Scenery.AddLayer(this._mapLayers[i]);
            }

            // Update the camera to be in the middle of the map
            if (this._mapLayers.length > 0) {
                this.Scene.Camera.Position = this._mapLayers[0].Position;
            }
        }
    }

}