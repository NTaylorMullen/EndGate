(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), collisionInspector = null;
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);
    collisionInspector = new CollisionInspector(canvas);
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Circle(70, canvas.height / 2, 50, "red")));
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Circle(550, canvas.height / 2, 70, "blue")));
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Rectangle(300, canvas.height / 2, 200, 100, "green")));
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Rectangle(800, canvas.height / 2, 150, 75, "orange")));
})($, window);
//@ sourceMappingURL=Main.js.map
