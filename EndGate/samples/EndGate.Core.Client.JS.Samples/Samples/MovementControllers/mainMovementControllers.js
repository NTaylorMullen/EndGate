(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), cameraMover = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    cameraMover = new CharacterMover(canvas);
})($, window);
//@ sourceMappingURL=mainMovementControllers.js.map
