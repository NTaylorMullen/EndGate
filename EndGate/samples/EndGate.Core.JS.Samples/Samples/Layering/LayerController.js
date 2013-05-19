var LayerController = (function () {
    function LayerController(world) {
        var bindControls = function (controlHolderID, model) {
            $("#" + controlHolderID + " .addZIndex, #" + controlHolderID + " .subtractZIndex").click(function () {
                model.ZIndex = $(this).hasClass("addZIndex") ? model.ZIndex + 1 : model.ZIndex - 1;
                $("#" + controlHolderID + " .zindex").html(model.ZIndex.toString());
            });
        };
        bindControls("redRectController", world.RedRectangle);
        bindControls("greenRectController", world.GreenRectangle);
        bindControls("blueCircleController", world.BlueCircle);
    }
    return LayerController;
})();
//@ sourceMappingURL=LayerController.js.map
