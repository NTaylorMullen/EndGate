(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), layeringGame = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    layeringGame = new LayeringGame(canvas);
})($, window);
//@ sourceMappingURL=Main.js.map
