/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="CollisionInspector.ts" />

(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $("#gameHolder"),
        collisionInspector: CollisionInspector = null;

    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create our game
    collisionInspector = new CollisionInspector(canvas);

    // Add objects that we'll be checking collisions for
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Circle(70, canvas.height / 2, 50, "red")));
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Circle(550, canvas.height / 2, 70, "blue")));
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Rectangle(300, canvas.height / 2, 200, 100, "green")));
    collisionInspector.Add(new CollidableShape(new eg.Graphics.Rectangle(800, canvas.height / 2, 150, 75, "orange")));

})($, window);