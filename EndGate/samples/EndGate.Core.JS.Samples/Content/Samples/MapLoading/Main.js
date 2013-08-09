/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), gameHolder = $("#gameHolder"), loadMapButton = $("#loadMap"), mapUrlInput = $("#mapUrl"), loadDialogHolder = $("#loadDialogHolder"), game = null;

    // Setup the game canvas DOM
    canvas.width = gameHolder.width();
    canvas.height = gameHolder.height();
    gameHolder.append(canvas);

    // Create our game
    game = new MapLoading.Game(canvas, mapUrlInput, loadMapButton, gameHolder, loadDialogHolder);
})($, window);
//# sourceMappingURL=Main.js.map
