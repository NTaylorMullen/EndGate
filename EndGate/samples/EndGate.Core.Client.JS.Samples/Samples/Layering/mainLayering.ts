/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsLayering.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        layerer: Layerer = null,
        redRect: eg.Graphics.Rectangle = null,
        greenRect: eg.Graphics.Rectangle = null,
        blueCircle: eg.Graphics.Circle = null,
        canvasCenter: eg.Vector2d,
        rectWidth: number = 150,
        rectHeight: number = 325,
        circleRadius: number = 100,
        bindControls: Function = (controlHolderID: string, model: eg.Graphics.Abstractions.Shape) => {
            $("#" + controlHolderID + " .addZIndex, #" + controlHolderID + " .subtractZIndex").click(function() {
                // The ZIndex is the property we set to control the layering of the renderer
                model.ZIndex = $(this).hasClass("addZIndex") ? model.ZIndex + 1 : model.ZIndex - 1;
                $("#" + controlHolderID + " .zindex").html(model.ZIndex.toString());
            });
        };

    canvas.width = holder.width();
    canvas.height = holder.height();
    canvasCenter = new eg.Vector2d(canvas.width / 2, canvas.height / 2);

    holder.append(canvas);

    layerer = new Layerer(canvas);

    redRect = new eg.Graphics.Rectangle(canvasCenter.X - rectWidth/3, canvasCenter.Y, rectWidth, rectHeight, "red");
    redRect.Rotation = Math.PI / 4;
    greenRect = new eg.Graphics.Rectangle(canvasCenter.X + rectWidth / 3, canvasCenter.Y, rectWidth, rectHeight, "green");
    greenRect.Rotation = -Math.PI / 4;
    blueCircle = new eg.Graphics.Circle(canvasCenter.X, canvasCenter.Y, circleRadius, "blue");

    layerer.Scene.Add(redRect);
    layerer.Scene.Add(greenRect);
    layerer.Scene.Add(blueCircle);

    bindControls("redRectController", redRect);
    bindControls("greenRectController", greenRect);
    bindControls("blueCircleController", blueCircle);    

})($, window);