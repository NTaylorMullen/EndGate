/// <reference path="../../Scripts/jquery.d.ts" /> 
/// <reference path="SetupManager.ts" />

(function ($, window) {
    var mapBuilderCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        spriteSheetViewerCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        mapBuilderHolder: JQuery = $("#mapBuilder"),
        spriteSheetViewerHolder: JQuery = $("#spriteSheetViewer"),
        baseWidth = mapBuilderHolder.parent().parent().width() - 100, // Calculate workable page width, 100 is a fluff value
        setupManager: MapCreator.SetupManager;

    // This sample showcases two games, so we build two canvases and setup the widths to fill up the page

    mapBuilderHolder.width(baseWidth * .666);
    spriteSheetViewerHolder.width(baseWidth - mapBuilderHolder.width());

    mapBuilderCanvas.width = mapBuilderHolder.width();
    mapBuilderCanvas.height = mapBuilderHolder.height();

    spriteSheetViewerCanvas.width = spriteSheetViewerHolder.width();
    spriteSheetViewerCanvas.height = spriteSheetViewerHolder.height();

    mapBuilderHolder.append(mapBuilderCanvas);
    spriteSheetViewerHolder.append(spriteSheetViewerCanvas);

    // Create the game
    setupManager = new MapCreator.SetupManager($("#setupPane"), $("#builderPane"), spriteSheetViewerCanvas, mapBuilderCanvas);

})($, window);