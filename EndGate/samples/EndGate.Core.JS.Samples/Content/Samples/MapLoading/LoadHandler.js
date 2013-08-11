/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
// Wrap in module to keep code out of global scope
var MapLoading;
(function (MapLoading) {
    var LoadHandler = (function () {
        function LoadHandler(_game, loadDialog) {
            this._game = _game;
            this._mapLayers = new Array();

            this._totalTiles = loadDialog.find("#totalTiles");
            this._totalLayers = loadDialog.find("#totalLayers");
            this._totalResources = loadDialog.find("#totalResources");
            this._percentLoaded = loadDialog.find("#percentLoaded");
            this._percentLoadedBar = loadDialog.find("#percentLoadedBar");
        }
        LoadHandler.prototype.Load = function (url, loadComplete) {
            var _this = this;
            // Clear the map information dialog
            this.ClearInfo();

            // Casting to any because the jquery declaration is wrong here
            // We use jquery to retrieve the map json from a url location
            ($.getJSON(url, function (mapJson) {
                // Use the JSONLoader to load the map json
                var preloadInfo = eg.Map.Loaders.JSONLoader.Load(mapJson, function (result) {
                    // We get an array of square tile maps that we then need to add to the scene
                    // Note that the ZIndexes of the layers are already set from 0 - (layers.length-1)
                    _this.LoadLayers(result.Layers);

                    // Notify the caller that the load has completed.
                    loadComplete();
                });

                _this.SetInfo(preloadInfo);

                // Bind to the "percent loaded" function.  This is triggered every time the percent is updated.
                preloadInfo.OnPercentLoaded.Bind(function (percent) {
                    _this.UpdateLoadedPercent(percent);
                });
            })).fail(function () {
                alert("Unable to retrieve map data from the provided url.");
            });
        };

        // Reset all the load information
        LoadHandler.prototype.ClearInfo = function () {
            this._lastPercentValue = -1;
            this._totalTiles.html("...");
            this._totalLayers.html("...");
            this._totalResources.html("...");
            this._percentLoaded.html("...");
            this._percentLoadedBar.css("width", "0%");
        };

        // Set the load information based on the preload information gathered from the EndGate json loader.
        LoadHandler.prototype.SetInfo = function (info) {
            this._totalTiles.html(this.ToFormattedNumberString(info.TileCount));
            this._totalLayers.html(this.ToFormattedNumberString(info.LayerCount));
            this._totalResources.html(this.ToFormattedNumberString(info.ResourceSheetCount));
            this.UpdateLoadedPercent(0);
        };

        LoadHandler.prototype.UpdateLoadedPercent = function (percent) {
            var percentVal = Math.round(percent * 100);

            if (percentVal !== this._lastPercentValue) {
                this._percentLoaded.html(percentVal.toString());
                this._percentLoadedBar.css("width", percentVal.toString() + "%");
            }
        };

        // Convert numbers to be comma delimited, aka 1000 goes to 1,000.
        LoadHandler.prototype.ToFormattedNumberString = function (val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };

        LoadHandler.prototype.LoadLayers = function (layers) {
            for (var i = 0; i < this._mapLayers.length; i++) {
                this._game.Scene.Remove(this._mapLayers[i]);
            }

            if (layers) {
                this._mapLayers = layers;
            }

            for (var i = 0; i < this._mapLayers.length; i++) {
                this._game.Scene.Add(this._mapLayers[i]);
            }

            if (this._mapLayers.length > 0) {
                this._game.Scene.Camera.Position = this._mapLayers[0].Position;
            }
        };
        return LoadHandler;
    })();
    MapLoading.LoadHandler = LoadHandler;
})(MapLoading || (MapLoading = {}));
//@ sourceMappingURL=LoadHandler.js.map
