(function (window, bo, assets) {

    QUnit.module("Bounding Rectangle Facts");

    QUnit.test("Un-rotated Rectangle Corners Get works", function () {
        var rect = new bo.BoundingRectangle(6, 6);
        rect.Position = new assets.Vector2d(3, 3);

        QUnit.ok(rect.TopLeft().Equivalent(assets.Vector2d.Zero()));
        QUnit.ok(rect.TopRight().Equivalent(new assets.Vector2d(6, 0)));
        QUnit.ok(rect.BotLeft().Equivalent(new assets.Vector2d(0, 6)));
        QUnit.ok(rect.BotRight().Equivalent(new assets.Vector2d(6, 6)));

        rect.Position = rect.Position.Subtract(6);
        QUnit.ok(rect.TopLeft().Equivalent(new assets.Vector2d(-6, -6)));
        QUnit.ok(rect.TopRight().Equivalent(new assets.Vector2d(0, -6)));
        QUnit.ok(rect.BotLeft().Equivalent(new assets.Vector2d(-6, 0)));
        QUnit.ok(rect.BotRight().Equivalent(assets.Vector2d.Zero()));
    });

    QUnit.test("Rotated Rectangle Corners Get works", function () {
        var rect = new bo.BoundingRectangle(4, 2);
        rect.Position = new assets.Vector2d(3, 2);
        rect.Rotation = Math.PI / 2;

        var topLeft = rect.TopLeft().Clone();
        var topRight = rect.TopRight().Clone();
        var botLeft = rect.BotLeft().Clone();
        var botRight = rect.BotRight().Clone();

        topLeft.Apply(Math.round);
        topRight.Apply(Math.round);
        botLeft.Apply(Math.round);
        botRight.Apply(Math.round);

        QUnit.ok(topLeft.Equivalent(new assets.Vector2d(2, 4)));
        QUnit.ok(topRight.Equivalent(new assets.Vector2d(2, 0)));
        QUnit.ok(botLeft.Equivalent(new assets.Vector2d(4, 4)));
        QUnit.ok(botRight.Equivalent(new assets.Vector2d(4, 0)));
    });

    QUnit.test("Un-rotated Rectangle Corners Get works", function () {
        var rect1 = new bo.BoundingRectangle(10, 6);
        rect1.Position = new assets.Vector2d(5, 3);
        
        var rect2 = new bo.BoundingRectangle(3, 3);
        rect2.Position = new assets.Vector2d(5, 3);

        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));

        rect2.Position = rect2.Position.Add(3);
        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));

        rect2.Position = rect2.Position.Add(1);
        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));

        rect2.Position = rect2.Position.Add(1);
        QUnit.ok(!rect1.Intersects(rect2));
        QUnit.ok(!rect2.Intersects(rect1));
    });

    QUnit.test("Rotated Rectangles collide correctly", function () {
        var rect1 = new bo.BoundingRectangle(4.24, 2.83);
        rect1.Position = new assets.Vector2d(2.5, 2.5);
        rect1.Rotation = -Math.PI / 4;

        var rect2 = new bo.BoundingRectangle(6, 4);
        rect2.Position = new assets.Vector2d(9, 4);

        QUnit.ok(!rect1.Intersects(rect2));
        QUnit.ok(!rect2.Intersects(rect1));

        rect2.Position.X -= 2;

        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));

        rect2.Rotation = Math.PI / 2;
        rect2.Position = rect2.Position.Add(1);

        QUnit.ok(!rect1.Intersects(rect2));
        QUnit.ok(!rect2.Intersects(rect1));

        rect2.Rotation = Math.PI;

        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));

        rect2.Position.Y += 10;

        QUnit.ok(!rect1.Intersects(rect2));
        QUnit.ok(!rect2.Intersects(rect1));

        rect2.Position.Y -= 10;
        rect1.Position.X += 5;

        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));

        rect1.Position.X += 9;

        QUnit.ok(!rect1.Intersects(rect2));
        QUnit.ok(!rect2.Intersects(rect1));

        rect1.Rotation = 0;
        rect1.Position.X = 12;
        rect2.Rotation = Math.PI;

        QUnit.ok(rect1.Intersects(rect2));
        QUnit.ok(rect2.Intersects(rect1));
    });

    QUnit.test("Un-rotated rectangle contains point works.", function () {
        var rect = new bo.BoundingRectangle(6, 4);        
        var vertices;

        rect.Position = new assets.Vector2d(3, 2);

        vertices = rect.Vertices();

        QUnit.ok(rect.ContainsPoint(rect.Position));

        for (var i = 0; i < vertices.length; i++)
        {
            var vertex = vertices[i];
            QUnit.ok(rect.ContainsPoint(vertex));
        }

        QUnit.ok(!rect.ContainsPoint(new assets.Vector2d(-1, 0)));
        QUnit.ok(!rect.ContainsPoint(rect.TopRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.TopLeft().Subtract(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotLeft().Subtract(1)));
    });

    QUnit.test("Rotated rectangle contains point works.", function () {
        var rect = new bo.BoundingRectangle(4.24, 2.83);
        var vertices;

        rect.Position = new assets.Vector2d(2.5, 2.5);
        rect.Rotation = -Math.PI / 4;

        vertices = rect.Vertices();

        QUnit.ok(rect.ContainsPoint(rect.Position));

        for (var i = 0; i < vertices.length; i++) {
            var vertex = vertices[i];
            QUnit.ok(rect.ContainsPoint(vertex));
        }

        QUnit.ok(!rect.ContainsPoint(new assets.Vector2d(-1, 0)));
        QUnit.ok(!rect.ContainsPoint(rect.TopRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.TopLeft().Subtract(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotLeft().Subtract(1)));

        QUnit.ok(rect.ContainsPoint(rect.TopRight().Subtract(1)));
        QUnit.ok(rect.ContainsPoint(rect.BotRight().Subtract(1)));
        QUnit.ok(rect.ContainsPoint(rect.TopLeft().Add(1)));
        QUnit.ok(rect.ContainsPoint(rect.BotLeft().Add(1)));
    });

})(window, EndGate.Core.BoundingObject, EndGate.Core.Assets);