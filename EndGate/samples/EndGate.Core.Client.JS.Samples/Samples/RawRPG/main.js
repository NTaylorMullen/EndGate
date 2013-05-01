(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), rpg = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    rpg = new RPG(canvas);
    rpg.Scene.Add(new eg.Graphics.Rectangle(0, 0, 150, 75, "orange"));
})($, window);
//@ sourceMappingURL=main.js.map
