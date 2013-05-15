(function ($, window) {
    var canvas = window.document.createElement("canvas"), holder = $("#gameHolder"), animatedSprites = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    animatedSprites = new AnimatedSprites(canvas);
})($, window);
//@ sourceMappingURL=Main.js.map
