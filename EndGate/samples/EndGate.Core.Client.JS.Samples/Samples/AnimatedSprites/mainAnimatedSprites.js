(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), animator = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    animator = new Animator(canvas);
})($, window);
//@ sourceMappingURL=mainAnimatedSprites.js.map
