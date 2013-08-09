/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="SetupManager.ts" />
(function ($, window) {
    var mapBuilderCanvas = document.createElement("canvas"), spriteSheetViewerCanvas = document.createElement("canvas"), mapBuilderHolder = $("#mapBuilder"), spriteSheetViewerHolder = $("#spriteSheetViewer"), baseWidth = mapBuilderHolder.parent().parent().width() - 100, setupManager;

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
//# sourceMappingURL=Main.js.map
