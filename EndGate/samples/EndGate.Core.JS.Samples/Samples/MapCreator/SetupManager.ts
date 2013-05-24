/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="MapBuilder.ts" />
/// <reference path="SpriteSheetViewer.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export class SetupManager {
        private _mapBuilder: MapBuilder;
        private _spriteSheetViewer: SpriteSheetViewer;

        constructor(setupPane: JQuery, builderPane: JQuery, spriteSheetViewerCanvas: HTMLCanvasElement, mapBuilderCanvas: HTMLCanvasElement) {
            var dimensionRows = setupPane.find("#dimensionRows"),
                dimensionColumns = setupPane.find("#dimensionColumns"),
                tileSizeWidth = setupPane.find("#tileSizeWidth"),
                tileSizeHeight = setupPane.find("#tileSizeHeight"),
                mapBuilderUtilities = builderPane.find("#mapBuilderUtilities"),
                savedMapsSelect = setupPane.find("#savedMaps"),
                loadMap = setupPane.find("#loadMap"),
                loadFromText = setupPane.find("#loadFromText"),
                loadText = setupPane.find("#loadText"),
                savedMaps = PersistenceManager.GetSavedMaps();

            mapBuilderUtilities.width(mapBuilderCanvas.width + spriteSheetViewerCanvas.width + 38);

            setupPane.find("#createMap").click(() => {
                $("#blockWrapper").height($("#builderPane").height());
                this._spriteSheetViewer = new SpriteSheetViewer(spriteSheetViewerCanvas, $("#spriteSheetUrl").val(), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));
                this._mapBuilder = new MapBuilder(mapBuilderCanvas, mapBuilderUtilities, this._spriteSheetViewer, parseInt(dimensionRows.val()), parseInt(dimensionColumns.val()), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));

                setupPane.addClass("hide");
                builderPane.removeClass("hide");
            });

            setupPane.find("#resetSetup").click(() => {
                dimensionRows.val("");
                dimensionColumns.val("");
                tileSizeWidth.val("");
                tileSizeHeight.val("");
            });

            for (var saveName in savedMaps) {
                savedMapsSelect.append($("<option value='" + saveName + "'>" + saveName + "</option>"));
                loadMap.removeClass("disabled");
            }

            loadMap.click(() => {
                var saveName = savedMapsSelect.val();

                if (savedMaps[saveName]) {
                    var settings: ISettings = savedMaps[saveName];

                    this.Initialize(settings, spriteSheetViewerCanvas, mapBuilderCanvas, mapBuilderUtilities);

                    setupPane.addClass("hide");
                    builderPane.removeClass("hide");
                }
            });

            loadFromText.click(() => {
                if (loadText.val().length === 0) {
                    return;
                }

                var settings: ISettings = JSON.parse(loadText.val())._output;

                loadText.val("");

                this.Initialize(settings, spriteSheetViewerCanvas, mapBuilderCanvas, mapBuilderUtilities);

                setupPane.addClass("hide");
                builderPane.removeClass("hide");
            });
        }

        private Initialize(settings: ISettings, spriteSheetViewerCanvas: HTMLCanvasElement, mapBuilderCanvas: HTMLCanvasElement, mapBuilderUtilities: JQuery): void {
            $("#blockWrapper").height($("#builderPane").height());
            this._spriteSheetViewer = new SpriteSheetViewer(spriteSheetViewerCanvas, settings.SpriteSheetUrl, settings.TileSize.Width, settings.TileSize.Height,
            () => {
                this._mapBuilder = new MapBuilder(mapBuilderCanvas, mapBuilderUtilities, this._spriteSheetViewer, settings.Rows, settings.Columns, settings.TileSize.Width, settings.TileSize.Height);
                this._mapBuilder.LayerManager.LoadLayersFromResourceMaps(settings.Layers, this._spriteSheetViewer.VisibleGrid);
            });
        }
    }

}