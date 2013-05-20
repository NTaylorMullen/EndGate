(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), movementControllerGame = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    movementControllerGame = new MovementControllerGame(canvas);
})($, window);
//@ sourceMappingURL=Main.js.map
