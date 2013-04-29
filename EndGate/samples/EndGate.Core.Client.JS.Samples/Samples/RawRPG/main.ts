/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="RPG.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        rpg: RPG = null;

    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    rpg = new RPG(canvas);

})($, window);