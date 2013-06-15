/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="MapBuilder.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var PersistenceManager = (function () {
        function PersistenceManager(utilities, _getLayers, _spriteSheetUrl, _buildResourceMap) {
            this._getLayers = _getLayers;
            this._spriteSheetUrl = _spriteSheetUrl;
            this._buildResourceMap = _buildResourceMap;
            var _this = this;
            var saveButton = $("#save"), saveName = $("#saveName"), saveDialog = $("#saveDialog"), layerMaps = [], that = this;
            saveButton.click(function () {
                _this.SaveMap(saveName.val());
                saveDialog.html("Last saved at: " + new Date().toTimeString());
            });
        }
        PersistenceManager.prototype.BuildResourceMaps = function () {
            var layerMaps = [], layers = this._getLayers();
            for(var i = 0; i < layers.length; i++) {
                layerMaps.push({
                    Layer: this._buildResourceMap(layers[i].Layer),
                    Name: layers[i].Name
                });
            }
            return layerMaps;
        };
        PersistenceManager.prototype.SaveMap = function (saveName, namespace) {
            if (typeof namespace === "undefined") { namespace = "mapBuilder"; }
            var layerMaps = this.BuildResourceMaps(), layers = this._getLayers();
            var settings = {
                Rows: layers[0].Layer.Rows(),
                Columns: layers[0].Layer.Columns(),
                TileSize: layers[0].Layer.TileSize(),
                SpriteSheetUrl: this._spriteSheetUrl,
                Layers: layerMaps
            }, maps = localStorage.getItem(namespace);
            if(!maps) {
                maps = {
                };
            } else {
                maps = JSON.parse(maps);
            }
            maps[saveName] = settings;
            localStorage.setItem(namespace, JSON.stringify(maps));
        };
        PersistenceManager.GetSavedMaps = function GetSavedMaps(namespace) {
            if (typeof namespace === "undefined") { namespace = "mapBuilder"; }
            var strMaps = localStorage.getItem(namespace), maps = JSON.parse(strMaps);
            return maps;
        };
        return PersistenceManager;
    })();
    MapCreator.PersistenceManager = PersistenceManager;    
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=PersistenceManager.js.map
