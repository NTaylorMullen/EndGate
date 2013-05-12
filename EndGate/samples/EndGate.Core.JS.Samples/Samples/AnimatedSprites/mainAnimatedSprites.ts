/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsAnimatedSprites.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        animator: Animator = null;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    animator = new Animator(canvas);

})($, window);