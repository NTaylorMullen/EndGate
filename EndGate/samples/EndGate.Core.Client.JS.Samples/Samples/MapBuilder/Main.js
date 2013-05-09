(function ($, window) {
    var mapBuilderCanvas = document.createElement("canvas"), spriteSheetViewerCanvas = document.createElement("canvas"), mapBuilderHolder = $("#mapBuilder"), spriteSheetViewerHolder = $("#spriteSheetViewer"), setupManager;
    mapBuilderCanvas.width = mapBuilderHolder.width();
    mapBuilderCanvas.height = mapBuilderHolder.height();
    spriteSheetViewerCanvas.width = spriteSheetViewerHolder.width();
    spriteSheetViewerCanvas.height = spriteSheetViewerHolder.height();
    mapBuilderHolder.append(mapBuilderCanvas);
    spriteSheetViewerHolder.append(spriteSheetViewerCanvas);
    setupManager = new SetupManager($("#setupPane"), $("#builderPane"), spriteSheetViewerCanvas, mapBuilderCanvas);
})($, window);
//@ sourceMappingURL=Main.js.map
