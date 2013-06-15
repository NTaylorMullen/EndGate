/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="World.ts" />

// Wrap in module to keep code out of global scope
module Layering {

    export class LayerController {
        constructor(world: World) {
            // Helper function to bind our + and our - to control the ZIndex of the graphics
            var bindControls: Function = (controlHolderID: string, model: eg.Graphics.Abstractions.Shape) => {
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
    }

}