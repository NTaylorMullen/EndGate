/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
        var canvas = document.createElement("canvas"), holder = $("#gameHolder"), numOfRectangles = $("#numOfRectangles"), numOfCircles = $("#numOfCircles"), clearInput = function () {
        numOfRectangles.val("");
        numOfCircles.val("");
    }, game = null;
    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    // Create our game
    game = new CollisionDetection.Game(canvas);
    // Start off the scene with a single rectangle
    game.AddRandomRectangle();
    $("#addItems").click(function () {
        var rectanglesToAdd = parseInt(numOfRectangles.val()) || 0, circlesToAdd = parseInt(numOfCircles.val()) || 0;
        for(var i = 0; i < rectanglesToAdd; i++) {
            game.AddRandomRectangle();
        }
        for(var i = 0; i < circlesToAdd; i++) {
            game.AddRandomCircle();
        }
    });
    $("#clearItems").click(function () {
        game.Clear();
        clearInput();
    });
})($, window);
//@ sourceMappingURL=Main.js.map
