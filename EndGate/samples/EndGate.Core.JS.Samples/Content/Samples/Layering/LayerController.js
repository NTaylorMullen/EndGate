/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="World.ts" />
// Wrap in module to keep code out of global scope
var Layering;
(function (Layering) {
    var LayerController = (function () {
        function LayerController(world) {
            // Helper function to bind our + and our - to control the ZIndex of the graphics
            var bindControls = function (controlHolderID, model) {
                $("#" + controlHolderID + " .addZIndex, #" + controlHolderID + " .subtractZIndex").click(function () {
                    // The ZIndex is the property we set to control the layering, higher values = more on top
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
    Layering.LayerController = LayerController;
})(Layering || (Layering = {}));
//# sourceMappingURL=LayerController.js.map
