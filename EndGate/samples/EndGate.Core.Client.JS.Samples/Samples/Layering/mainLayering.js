(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), layerer = null, redRect = null, greenRect = null, blueCircle = null, canvasCenter, rectWidth = 150, rectHeight = 325, circleRadius = 100, bindControls = function (controlHolderID, model) {
        $("#" + controlHolderID + " .addZIndex, #" + controlHolderID + " .subtractZIndex").click(function () {
            model.ZIndex = $(this).hasClass("addZIndex") ? model.ZIndex + 1 : model.ZIndex - 1;
            $("#" + controlHolderID + " .zindex").html(model.ZIndex.toString());
        });
    };
    canvas.width = holder.width();
    canvas.height = holder.height();
    canvasCenter = new EndGate.Core.Assets.Vector2d(canvas.width / 2, canvas.height / 2);
    holder.append(canvas);
    layerer = new Layerer(canvas);
    redRect = new EndGate.Core.Graphics.Shapes.Rectangle(canvasCenter.X - rectWidth / 3, canvasCenter.Y, rectWidth, rectHeight);
    redRect.Color("red");
    redRect.Rotation = Math.PI / 4;
    greenRect = new EndGate.Core.Graphics.Shapes.Rectangle(canvasCenter.X + rectWidth / 3, canvasCenter.Y, rectWidth, rectHeight);
    greenRect.Color("green");
    greenRect.Rotation = -Math.PI / 4;
    blueCircle = new EndGate.Core.Graphics.Shapes.Circle(canvasCenter.X, canvasCenter.Y, circleRadius);
    blueCircle.Color("blue");
    layerer.Scene.Add(redRect);
    layerer.Scene.Add(greenRect);
    layerer.Scene.Add(blueCircle);
    bindControls("redRectController", redRect);
    bindControls("greenRectController", greenRect);
    bindControls("blueCircleController", blueCircle);
})($, window);
//@ sourceMappingURL=mainLayering.js.map
