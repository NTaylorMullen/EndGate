(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), lastMouseEvent = $("#lastMouseEvent"), mouseInputGame = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    mouseInputGame = new MouseInputGame(canvas, lastMouseEvent);
})($, window);
//@ sourceMappingURL=Main.js.map
