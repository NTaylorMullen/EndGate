/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CollisionDetection.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        numOfRectangles: JQuery = $("#numOfRectangles"),
        numOfCircles: JQuery = $("#numOfCircles"),
        clearInput = () => {
            numOfRectangles.val("");
            numOfCircles.val("");
        },
        collisionDetection = null;

    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create our game
    collisionDetection = new CollisionDetection(canvas);

    // Start off the scene with a single rectangle
    collisionDetection.AddRandomRectangle();

    $("#addItems").click(() => {
        var rectanglesToAdd = parseInt(numOfRectangles.val()) || 0,
            circlesToAdd = parseInt(numOfCircles.val()) || 0;

        for (var i = 0; i < rectanglesToAdd; i++) {
            collisionDetection.AddRandomRectangle();
        }

        for (var i = 0; i < circlesToAdd; i++) {
            collisionDetection.AddRandomCircle();
        }
    });

    $("#clearItems").click(() => {
        collisionDetection.Clear();

        clearInput();
    });

})($, window);