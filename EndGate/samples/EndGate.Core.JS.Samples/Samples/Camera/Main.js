(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), cameraPosition = $("#cameraPosition"), cameraDistance = $("#cameraDistance"), cameraMover = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    cameraMover = new CameraMover(canvas, cameraPosition, cameraDistance);
})($, window);
//@ sourceMappingURL=Main.js.map
