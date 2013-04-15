/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsLayering.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        layerer: Layerer = null,
        redRect: EndGate.Core.Graphics.Shapes.Rectangle = null,
        greenRect: EndGate.Core.Graphics.Shapes.Rectangle = null,
        blueCircle: EndGate.Core.Graphics.Shapes.Circle = null,
        canvasCenter: EndGate.Core.Assets.Vector2d,
        rectWidth: number = 150,
        rectHeight: number = 325,
        circleRadius: number = 100,
        bindControls: Function = (controlHolderID: string, model: EndGate.Core.Graphics.Shapes.Shape) => {
            $("#" + controlHolderID + " .addZIndex, #" + controlHolderID + " .subtractZIndex").click(function() {
                model.ZIndex = $(this).hasClass("addZIndex") ? model.ZIndex + 1 : model.ZIndex - 1;
                $("#" + controlHolderID + " .zindex").html(model.ZIndex.toString());
            });
        };

    canvas.width = holder.width();
    canvas.height = holder.height();
    canvasCenter = new EndGate.Core.Assets.Vector2d(canvas.width / 2, canvas.height / 2);

    holder.append(canvas);

    layerer = new Layerer(canvas);

    redRect = new EndGate.Core.Graphics.Shapes.Rectangle(canvasCenter.X - rectWidth/3, canvasCenter.Y, rectWidth, rectHeight);
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