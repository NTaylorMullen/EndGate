/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Game.ts" />
(function ($, window) {
    // Create a game canvas to use.  If we create a game without providing a canvas it will create a
    // canvas that fills the entire viewport.
    var canvas = document.createElement("canvas"), holder = $("#gameHolder"), game = null;

    // Setup the game canvas DOM
    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    // Create our game
    game = new CollisionInspector.Game(canvas);

    // Add objects that we'll be checking collisions for
    game.Add(new CollisionInspector.CollidableShape(new eg.Graphics.Circle(70, canvas.height / 2, 50, eg.Graphics.Color.Red)));
    game.Add(new CollisionInspector.CollidableShape(new eg.Graphics.Circle(550, canvas.height / 2, 70, eg.Graphics.Color.Blue)));
    game.Add(new CollisionInspector.CollidableShape(new eg.Graphics.Rectangle(300, canvas.height / 2, 200, 100, eg.Graphics.Color.Green)));
    game.Add(new CollisionInspector.CollidableShape(new eg.Graphics.Rectangle(800, canvas.height / 2, 150, 75, eg.Graphics.Color.Orange)));
})($, window);
//# sourceMappingURL=Main.js.map
