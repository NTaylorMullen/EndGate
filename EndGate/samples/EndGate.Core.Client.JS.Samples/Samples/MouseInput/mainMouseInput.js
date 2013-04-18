(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), mouseMonitor = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    mouseMonitor = new MouseMonitor(canvas);
    redRect = new EndGate.Core.Graphics.Shapes.Rectangle(canvasCenter.X - rectWidth / 3, canvasCenter.Y, rectWidth, rectHeight, "red");
    redRect.Rotation = Math.PI / 4;
    greenRect = new EndGate.Core.Graphics.Shapes.Rectangle(canvasCenter.X + rectWidth / 3, canvasCenter.Y, rectWidth, rectHeight, "green");
    greenRect.Rotation = -Math.PI / 4;
    blueCircle = new EndGate.Core.Graphics.Shapes.Circle(canvasCenter.X, canvasCenter.Y, circleRadius, "blue");
    layerer.Scene.Add(redRect);
    layerer.Scene.Add(greenRect);
    layerer.Scene.Add(blueCircle);
    bindControls("redRectController", redRect);
    bindControls("greenRectController", greenRect);
    bindControls("blueCircleController", blueCircle);
})($, window);
//@ sourceMappingURL=mainMouseInput.js.map
