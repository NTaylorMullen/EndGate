/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="MapBuilder.ts" />
/// <reference path="SpriteSheetViewer.ts" />

class SetupManager {
    private _mapBuilder: MapBuilder;
    private _spriteSheetViewer: SpriteSheetViewer;

    constructor(setupPane: JQuery, builderPane: JQuery, spriteSheetViewerCanvas: HTMLCanvasElement, mapBuilderCanvas: HTMLCanvasElement) {
        var dimensionRows = setupPane.find("#dimensionRows"),
            dimensionColumns = setupPane.find("#dimensionColumns"),
            tileSizeWidth = setupPane.find("#tileSizeWidth"),
            tileSizeHeight = setupPane.find("#tileSizeHeight");
        
        setupPane.find("#createMap").click(() => {
            this._spriteSheetViewer = new SpriteSheetViewer(spriteSheetViewerCanvas, builderPane.find("#spriteSheetViewerUtilities"), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));
            this._mapBuilder = new MapBuilder(mapBuilderCanvas, builderPane.find("#mapBuilderUtilities"));

            setupPane.addClass("hide");
            builderPane.removeClass("hide");
        });

        setupPane.find("#resetSetup").click(() => {
            dimensionRows.val("");
            dimensionColumns.val("");
            tileSizeWidth.val("");
            tileSizeHeight.val("");            
        });

        setupPane.find("#createMap").click();
    }
}