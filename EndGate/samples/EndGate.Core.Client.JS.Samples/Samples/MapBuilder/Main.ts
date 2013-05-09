/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="SetupManager.ts" />

(function ($, window) {
    var mapBuilderCanvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        spriteSheetViewerCanvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        mapBuilderHolder: JQuery = $("#mapBuilder"),
        spriteSheetViewerHolder: JQuery = $("#spriteSheetViewer"),
        setupManager: SetupManager;

    mapBuilderCanvas.width = mapBuilderHolder.width();
    mapBuilderCanvas.height = mapBuilderHolder.height();

    spriteSheetViewerCanvas.width = spriteSheetViewerHolder.width();
    spriteSheetViewerCanvas.height = spriteSheetViewerHolder.height();

    mapBuilderHolder.append(mapBuilderCanvas);
    spriteSheetViewerHolder.append(spriteSheetViewerCanvas);

    setupManager = new SetupManager($("#setupPane"), $("#builderPane"), spriteSheetViewerCanvas, mapBuilderCanvas);
    
})($, window);