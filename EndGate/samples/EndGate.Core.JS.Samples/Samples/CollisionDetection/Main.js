(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), numOfRectangles = $("#numOfRectangles"), numOfCircles = $("#numOfCircles"), clearInput = function () {
        numOfRectangles.val("");
        numOfCircles.val("");
    }, collisionDetection = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    collisionDetection = new CollisionDetection(canvas);
    collisionDetection.AddRandomRectangle();
    $("#addItems").click(function () {
        var rectanglesToAdd = parseInt(numOfRectangles.val()) || 0, circlesToAdd = parseInt(numOfCircles.val()) || 0;
        for(var i = 0; i < rectanglesToAdd; i++) {
            collisionDetection.AddRandomRectangle();
        }
        for(var i = 0; i < circlesToAdd; i++) {
            collisionDetection.AddRandomCircle();
        }
    });
    $("#clearItems").click(function () {
        collisionDetection.Clear();
        clearInput();
    });
})($, window);
//@ sourceMappingURL=Main.js.map
