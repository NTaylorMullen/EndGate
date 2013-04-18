/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="assetsMouseInput.ts" />

(function ($, window) {
    var canvas: HTMLCanvasElement = < HTMLCanvasElement > document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        lastMouseEvent: JQuery = $("#lastMouseEvent"),
        mouseMonitor: MouseMonitor = null;
        
    canvas.width = holder.width();
    canvas.height = holder.height();

    holder.append(canvas);

    mouseMonitor = new MouseMonitor(canvas, lastMouseEvent);

})($, window);