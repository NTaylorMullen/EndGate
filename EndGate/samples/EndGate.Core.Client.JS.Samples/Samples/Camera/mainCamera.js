(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), cameraPosition = $("#cameraPosition"), cameraDistance = $("#cameraDistance"), cameraMover = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    cameraMover = new CameraMover(canvas, cameraPosition, cameraDistance);
    (function () {
        var shapes = [], texts = [];
        shapes.push(new EndGate.Core.Graphics.Shapes.Circle(350, 600, 25, "green"));
        shapes.push(new EndGate.Core.Graphics.Shapes.Circle(400, 200, 25, "orange"));
        shapes[shapes.length - 1].Rotation = Math.PI / 2;
        shapes.push(new EndGate.Core.Graphics.Shapes.Rectangle(0, 0, 200, 125, "gray"));
        shapes[shapes.length - 1].Rotation = Math.PI / 4;
        shapes.push(new EndGate.Core.Graphics.Shapes.Rectangle(0, 800, 400, 125, "yellow"));
        shapes[shapes.length - 1].Rotation = Math.PI * 1.75;
        shapes.push(new EndGate.Core.Graphics.Shapes.Rectangle(canvas.width, canvas.height + 125, 125, 125, "red"));
        texts.push(new EndGate.Core.Graphics.Text.Text2d(0, canvas.height / 2, "LEFT SIDE"));
        texts[texts.length - 1].Rotation = -Math.PI / 2;
        texts.push(new EndGate.Core.Graphics.Text.Text2d(canvas.width, canvas.height / 2, "RIGHT SIDE"));
        texts[texts.length - 1].Rotation = Math.PI / 2;
        texts.push(new EndGate.Core.Graphics.Text.Text2d(canvas.width / 2, 0, "TOP SIDE"));
        texts.push(new EndGate.Core.Graphics.Text.Text2d(canvas.width / 2, canvas.height, "BOTTOM SIDE"));
        texts[texts.length - 1].Rotation = Math.PI;
        texts.push(new EndGate.Core.Graphics.Text.Text2d(canvas.width, -30, "Hello!"));
        for(var i = 0; i < shapes.length; i++) {
            cameraMover.Scene.Add(shapes[i]);
        }
        for(var i = 0; i < texts.length; i++) {
            texts[i].FontSettings.FontSize(16);
            cameraMover.Scene.Add(texts[i]);
        }
    })();
})($, window);
//@ sourceMappingURL=mainCamera.js.map
