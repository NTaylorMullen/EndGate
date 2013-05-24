/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="Game.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        game: KeyboardInput.Game = null;

    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height() - 30;
    holder.append(canvas);

    // Create our game
    game = new KeyboardInput.Game(canvas, $("#bindButton"), $("#unbindButton"), $("#bindingCommandInput"), $("#bindingResultInput"), $("#commandHolder"));
})($, window);