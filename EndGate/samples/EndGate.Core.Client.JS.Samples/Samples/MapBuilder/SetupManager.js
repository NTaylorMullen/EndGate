var SetupManager = (function () {
    function SetupManager(setupPane, builderPane, spriteSheetViewerCanvas, mapBuilderCanvas) {
        var _this = this;
        var dimensionRows = setupPane.find("#dimensionRows"), dimensionColumns = setupPane.find("#dimensionColumns"), tileSizeWidth = setupPane.find("#tileSizeWidth"), tileSizeHeight = setupPane.find("#tileSizeHeight");
        setupPane.find("#createMap").click(function () {
            _this._spriteSheetViewer = new SpriteSheetViewer(spriteSheetViewerCanvas, builderPane.find("#spriteSheetViewerUtilities"), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));
            _this._mapBuilder = new MapBuilder(mapBuilderCanvas, builderPane.find("#mapBuilderUtilities"), parseInt(dimensionRows.val()), parseInt(dimensionColumns.val()), parseFloat(tileSizeWidth.val()), parseFloat(tileSizeHeight.val()));
            setupPane.addClass("hide");
            builderPane.removeClass("hide");
        });
        setupPane.find("#resetSetup").click(function () {
            dimensionRows.val("");
            dimensionColumns.val("");
            tileSizeWidth.val("");
            tileSizeHeight.val("");
        });
        setupPane.find("#createMap").click();
    }
    return SetupManager;
})();
//@ sourceMappingURL=SetupManager.js.map
