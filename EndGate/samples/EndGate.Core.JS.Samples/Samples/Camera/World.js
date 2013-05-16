var World = (function () {
    function World(scene) {
        var shape, text, camSize = scene.Camera.Size;
        scene.Add(new eg.Graphics.Circle(350, 600, 25, "green"));
        scene.Add(new eg.Graphics.Rectangle(camSize.Width, camSize.Height + 125, 125, 125, "red"));
        shape = new eg.Graphics.Circle(400, 200, 25, "orange");
        shape.Rotation = Math.PI / 2;
        scene.Add(shape);
        shapes.push(new eg.Graphics.Rectangle(0, 0, 200, 125, "gray"));
        shapes[shapes.length - 1].Rotation = Math.PI / 4;
        shapes.push(new eg.Graphics.Rectangle(0, 800, 400, 125, "yellow"));
        shapes[shapes.length - 1].Rotation = Math.PI * 1.75;
        shapes.push(new eg.Graphics.Rectangle(canvas.width, canvas.height + 125, 125, 125, "red"));
        texts.push(new eg.Graphics.Text2d(0, canvas.height / 2, "LEFT SIDE"));
        texts[texts.length - 1].Rotation = -Math.PI / 2;
        texts.push(new eg.Graphics.Text2d(canvas.width, canvas.height / 2, "RIGHT SIDE"));
        texts[texts.length - 1].Rotation = Math.PI / 2;
        texts.push(new eg.Graphics.Text2d(canvas.width / 2, 0, "TOP SIDE"));
        texts.push(new eg.Graphics.Text2d(canvas.width / 2, canvas.height, "BOTTOM SIDE"));
        texts[texts.length - 1].Rotation = Math.PI;
        texts.push(new eg.Graphics.Text2d(canvas.width, -30, "Hello!"));
    }
    return World;
})();
//@ sourceMappingURL=World.js.map
