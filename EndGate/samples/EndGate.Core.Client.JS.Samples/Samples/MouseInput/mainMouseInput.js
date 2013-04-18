(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), lastMouseEvent = $("#lastMouseEvent"), mouseMonitor = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    mouseMonitor = new MouseMonitor(canvas, lastMouseEvent);
})($, window);
//@ sourceMappingURL=mainMouseInput.js.map
