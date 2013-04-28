(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), rpg = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    rpg = new Animator(canvas);
})($, window);
//@ sourceMappingURL=mainAnimatedSprites.js.map
