/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsAnimatedSprites.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        rpg: Animator = null;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    rpg = new Animator(canvas);

})($, window);