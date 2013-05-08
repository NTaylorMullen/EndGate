(function ($, window) {
    var mapBuilderCanvas = document.createElement("canvas"), spriteSheetViewerCanvas = document.createElement("canvas"), mapBuilderHolder = $("#mapBuilder"), spriteSheetViewerHolder = $("#spriteSheetViewer"), mapBuilderUtilities = $("#mapBuilderUtilities"), spriteSheetViewerUtilities = $("#spriteSheetViewerUtilities"), mapBuilder, spriteSheetViewer;
    mapBuilderCanvas.width = mapBuilderHolder.width();
    mapBuilderCanvas.height = mapBuilderHolder.height();
    spriteSheetViewerCanvas.width = spriteSheetViewerHolder.width();
    spriteSheetViewerCanvas.height = spriteSheetViewerHolder.height();
    mapBuilderHolder.append(mapBuilderCanvas);
    spriteSheetViewerHolder.append(spriteSheetViewerCanvas);
    mapBuilder = new MapBuilder(mapBuilderCanvas, mapBuilderUtilities);
    spriteSheetViewer = new SpriteSheetViewer(spriteSheetViewerCanvas, spriteSheetViewerUtilities);
})($, window);
//@ sourceMappingURL=Main.js.map
