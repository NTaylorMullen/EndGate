/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="MapBuilder.ts" />
/// <reference path="SpriteSheetViewer.ts" />

(function ($, window) {
    var mapBuilderCanvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        spriteSheetViewerCanvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        mapBuilderHolder: JQuery = $("#mapBuilder"),
        spriteSheetViewerHolder: JQuery = $("#spriteSheetViewer"),
        mapBuilderUtilities: JQuery = $("#mapBuilderUtilities"),
        spriteSheetViewerUtilities: JQuery = $("#spriteSheetViewerUtilities"),
        mapBuilder: MapBuilder,
        spriteSheetViewer: SpriteSheetViewer;

    mapBuilderCanvas.width = mapBuilderHolder.width();
    mapBuilderCanvas.height = mapBuilderHolder.height();

    spriteSheetViewerCanvas.width = spriteSheetViewerHolder.width();
    spriteSheetViewerCanvas.height = spriteSheetViewerHolder.height();

    mapBuilderHolder.append(mapBuilderCanvas);
    spriteSheetViewerHolder.append(spriteSheetViewerCanvas);

    mapBuilder = new MapBuilder(mapBuilderCanvas, mapBuilderUtilities);
    spriteSheetViewer = new SpriteSheetViewer(spriteSheetViewerCanvas, spriteSheetViewerUtilities);

})($, window);