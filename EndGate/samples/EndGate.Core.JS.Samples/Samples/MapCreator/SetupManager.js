/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="MapBuilder.ts" />
/// <reference path="SpriteSheetViewer.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var SetupManager = (function () {
        function SetupManager(setupPane, builderPane, spriteSheetViewerCanvas, mapBuilderCanvas) {
            var _this = this;
            var dimensionRows = setupPane.find("#dimensionRows"), dimensionColumns = setupPane.find("#dimensionColumns"), tileSizeWidth = setupPane.find("#tileSizeWidth"), tileSizeHeight = setupPane.find("#tileSizeHeight"), mapBuilderUtilities = builderPane.find("#mapBuilderUtilities"), savedMapsSelect = setupPane.find("#savedMaps"), loadMap = setupPane.find("#loadMap"), loadFromText = setupPane.find("#loadFromText"), loadText = setupPane.find("#loadText"), savedMaps = MapCreator.PersistenceManager.GetSavedMaps();
            mapBuilderUtilities.width(mapBuilderCanvas.width + spriteSheetViewerCanvas.width + 38);
            setupPane.find("#createMap").click(function () {
                $("#blockWrapper").height($("#builderPane").height());
                _this._spriteSheetViewer = new MapCreator.SpriteSheetViewer(spriteSheetViewerCanvas, $("#spriteSheetUrl").val(), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));
                _this._mapBuilder = new MapCreator.MapBuilder(mapBuilderCanvas, mapBuilderUtilities, _this._spriteSheetViewer, parseInt(dimensionRows.val()), parseInt(dimensionColumns.val()), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));
                setupPane.addClass("hide");
                builderPane.removeClass("hide");
            });
            setupPane.find("#resetSetup").click(function () {
                dimensionRows.val("");
                dimensionColumns.val("");
                tileSizeWidth.val("");
                tileSizeHeight.val("");
            });
            for(var saveName in savedMaps) {
                savedMapsSelect.append($("<option value='" + saveName + "'>" + saveName + "</option>"));
                loadMap.removeClass("disabled");
            }
            loadMap.click(function () {
                var saveName = savedMapsSelect.val();
                if(savedMaps[saveName]) {
                    var settings = savedMaps[saveName];
                    _this.Initialize(settings, spriteSheetViewerCanvas, mapBuilderCanvas, mapBuilderUtilities);
                    setupPane.addClass("hide");
                    builderPane.removeClass("hide");
                }
            });
            loadFromText.click(function () {
                if(loadText.val().length === 0) {
                    return;
                }
                var settings = JSON.parse(loadText.val())._output;
                loadText.val("");
                _this.Initialize(settings, spriteSheetViewerCanvas, mapBuilderCanvas, mapBuilderUtilities);
                setupPane.addClass("hide");
                builderPane.removeClass("hide");
            });
        }
        SetupManager.prototype.Initialize = function (settings, spriteSheetViewerCanvas, mapBuilderCanvas, mapBuilderUtilities) {
            var _this = this;
            $("#blockWrapper").height($("#builderPane").height());
            this._spriteSheetViewer = new MapCreator.SpriteSheetViewer(spriteSheetViewerCanvas, settings.SpriteSheetUrl, settings.TileSize.Width, settings.TileSize.Height, function () {
                _this._mapBuilder = new MapCreator.MapBuilder(mapBuilderCanvas, mapBuilderUtilities, _this._spriteSheetViewer, settings.Rows, settings.Columns, settings.TileSize.Width, settings.TileSize.Height);
                _this._mapBuilder.LayerManager.LoadLayersFromResourceMaps(settings.Layers, _this._spriteSheetViewer.VisibleGrid);
            });
        };
        return SetupManager;
    })();
    MapCreator.SetupManager = SetupManager;    
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=SetupManager.js.map
