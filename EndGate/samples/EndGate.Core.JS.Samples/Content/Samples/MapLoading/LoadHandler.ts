/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />

// Wrap in module to keep code out of global scope
module MapLoading {

    export class LoadHandler {
        private _mapLayers: Array<eg.Map.SquareTileMap>;
        private _totalTiles: JQuery;
        private _totalLayers: JQuery;
        private _totalResources: JQuery;
        private _percentLoaded: JQuery;
        private _percentLoadedBar: JQuery;
        private _lastPercentValue: number;

        constructor(private _game: Game, loadDialog: JQuery) {
            this._mapLayers = new Array<eg.Map.SquareTileMap>();

            this._totalTiles = loadDialog.find("#totalTiles");
            this._totalLayers = loadDialog.find("#totalLayers");
            this._totalResources = loadDialog.find("#totalResources");
            this._percentLoaded = loadDialog.find("#percentLoaded");
            this._percentLoadedBar = loadDialog.find("#percentLoadedBar");
        }

        public Load(url: string, loadComplete: () => void ): void {
            // Clear the map information dialog
            this.ClearInfo();

            // Casting to any because the jquery declaration is wrong here
            // We use jquery to retrieve the map json from a url location
            (<any>$.getJSON(url, (mapJson) => {
                // Use the JSONLoader to load the map json
                var preloadInfo = eg.Map.Loaders.JSONLoader.Load(mapJson, (result: eg.Map.Loaders.IMapLoadedResult) => {
                    // We get an array of square tile maps that we then need to add to the scene
                    // Note that the ZIndexes of the layers are already set from 0 - (layers.length-1)
                    this.LoadLayers(<Array<eg.Map.SquareTileMap>>result.Layers);

                    // Notify the caller that the load has completed.
                    loadComplete();
                });

                this.SetInfo(preloadInfo);

                // Bind to the "percent loaded" function.  This is triggered every time the percent is updated.
                preloadInfo.OnPercentLoaded.Bind((percent: number) => {
                    this.UpdateLoadedPercent(percent);
                });

            })).fail(() => {
                    alert("Unable to retrieve map data from the provided url.");
                });
        }

        // Reset all the load information 
        private ClearInfo(): void {
            this._lastPercentValue = -1;
            this._totalTiles.html("...");
            this._totalLayers.html("...");
            this._totalResources.html("...");
            this._percentLoaded.html("...");
            this._percentLoadedBar.css("width", "0%");
        }

        // Set the load information based on the preload information gathered from the EndGate json loader.
        private SetInfo(info: eg.Map.Loaders.IMapPreloadInfo): void {
            this._totalTiles.html(this.ToFormattedNumberString(info.TileCount));
            this._totalLayers.html(this.ToFormattedNumberString(info.LayerCount));
            this._totalResources.html(this.ToFormattedNumberString(info.ResourceSheetCount));
            this.UpdateLoadedPercent(0);
        }

        private UpdateLoadedPercent(percent: number): void {
            var percentVal = Math.round(percent * 100);

            // Only update the percentage values if it has changed (after rounding).
            if (percentVal !== this._lastPercentValue) {
                this._percentLoaded.html(percentVal.toString());
                this._percentLoadedBar.css("width", percentVal.toString() + "%");
            }
        }

        // Convert numbers to be comma delimited, aka 1000 goes to 1,000.
        private ToFormattedNumberString(val: number): string {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        private LoadLayers(layers: Array<eg.Map.SquareTileMap>): void {
            // Clear all existing layers (so we can click more than once)
            for (var i = 0; i < this._mapLayers.length; i++) {
                this._game.Map.Scenery.RemoveLayer(this._mapLayers[i]);
            }

            if (layers) {
                this._mapLayers = layers;
            }

            // Add all of the layers to the scenery (so they're drawn)
            for (var i = 0; i < this._mapLayers.length; i++) {
                this._game.Map.Scenery.AddLayer(this._mapLayers[i]);
            }

            // Update the camera to be in the middle of the map
            if (this._mapLayers.length > 0) {
                this._game.Scene.Camera.Position = this._mapLayers[0].Position;
            }
        }
    }

}