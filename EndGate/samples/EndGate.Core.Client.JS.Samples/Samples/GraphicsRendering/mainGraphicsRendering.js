(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), numOfRectangles = $("#numOfRectangles"), numOfCircles = $("#numOfCircles"), clearInput = function () {
        numOfRectangles.val("");
        numOfCircles.val("");
    }, renderer;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    renderer = new GraphicsRenderer(canvas);
    $("#addItems").click(function () {
        var rectanglesToAdd = parseInt(numOfRectangles.val()) || 0, circlesToAdd = parseInt(numOfCircles.val()) || 0;
        for(var i = 0; i < rectanglesToAdd; i++) {
            renderer.AddRandomRectangle();
        }
        for(var i = 0; i < circlesToAdd; i++) {
            renderer.AddRandomCircle();
        }
    });
    $("#clearItems").click(function () {
        renderer.Clear();
        clearInput();
    });
})($, window);
//@ sourceMappingURL=mainGraphicsRendering.js.map
