var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CameraController.ts" />
// Wrap in module to keep code out of global scope
var MapLoading;
(function (MapLoading) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas, mapUrlInput, loadMapButton) {
            var _this = this;
            _super.call(this, canvas);

            this._mapLayers = new Array();

            loadMapButton.click(function () {
                // Casting to any because the jquery declaration is wrong here
                // We use jquery to retrieve the map json from a url location
                ($.getJSON(mapUrlInput.val(), function (mapJson) {
                    // Use the JSONLoader to load the map json
                    eg.Map.Loaders.JSONLoader.Load(mapJson, function (result) {
                        // We get an array of square tile maps that we then need to add to the scene
                        // Note that the ZIndexes of the layers are already set from 0 - (layers.length-1)
                        _this.LoadLayers(result.Layers);
                    });
                })).fail(function () {
                    alert("Unable to retrieve map data from the provided url.");
                });
            });

            // Pre-load the scene with the initial json map
            loadMapButton.click();

            // This camera controller is what makes the camera move around the game map.
            this._cameraController = new MapLoading.CameraController(this.Scene.Camera, this.Input.Mouse);
        }
        Game.prototype.Update = function (gameTime) {
            this._cameraController.Update(gameTime);
        };

        Game.prototype.LoadLayers = function (layers) {
            for (var i = 0; i < this._mapLayers.length; i++) {
                this.Map.Scenery.RemoveLayer(this._mapLayers[i]);
            }

            if (layers) {
                this._mapLayers = layers;
            }

            for (var i = 0; i < this._mapLayers.length; i++) {
                this.Map.Scenery.AddLayer(this._mapLayers[i]);
            }

            if (this._mapLayers.length > 0) {
                this.Scene.Camera.Position = this._mapLayers[0].Position;
            }
        };
        return Game;
    })(eg.Game);
    MapLoading.Game = Game;
})(MapLoading || (MapLoading = {}));
//@ sourceMappingURL=Game.js.map
