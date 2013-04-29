/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsInputControllers.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        cameraMover: CharacterMover = null;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    cameraMover = new CharacterMover(canvas);

})($, window);