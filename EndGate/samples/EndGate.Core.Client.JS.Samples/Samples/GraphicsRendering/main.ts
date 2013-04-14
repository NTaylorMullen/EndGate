/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="graphicsRendering.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        numOfRectangles: JQuery = $("#numOfRectangles"),
        numOfCircles: JQuery = $("#numOfCircles"),
        clearInput = () => {
            numOfRectangles.val("");
            numOfCircles.val("");
        },
        renderer;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    renderer = new GraphicsRenderer(canvas);

    $("#addItems").click(() => {
        var rectanglesToAdd = parseInt(numOfRectangles.val()) || 0,
            circlesToAdd = parseInt(numOfCircles.val()) || 0;

        for (var i = 0; i < rectanglesToAdd; i++) {
            renderer.AddRandomRectangle();
        }

        for (var i = 0; i < circlesToAdd; i++) {
            renderer.AddRandomCircle();
        }

        clearInput();
    });

    $("#clearItems").click(() => {
        renderer.Clear();

        clearInput();
    });

})($, window);