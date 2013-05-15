/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="CameraMover.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        cameraPosition: JQuery = $("#cameraPosition"),
        cameraDistance: JQuery = $("#cameraDistance"),
        cameraMover: CameraMover = null;

    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create our game
    cameraMover = new CameraMover(canvas, cameraPosition, cameraDistance);    

})($, window);