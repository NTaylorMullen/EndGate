(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), characterControllerGame = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    characterControllerGame = new CharacterControllerGame(canvas);
})($, window);
//@ sourceMappingURL=Main.js.map
