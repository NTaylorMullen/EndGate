(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), keyboardInputGame = null;
    canvas.width = holder.width();
    canvas.height = holder.height() - 30;
    holder.append(canvas);
    keyboardInputGame = new KeyboardInputGame(canvas, $("#bindButton"), $("#unbindButton"), $("#bindingCommandInput"), $("#bindingResultInput"), $("#commandHolder"));
})($, window);
//@ sourceMappingURL=Main.js.map
