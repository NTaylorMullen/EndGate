(function () {

    QUnit.module("Bounding Rectangle Facts");

    QUnit.test("Un-rotated Rectangle Corners Get works", function () {
        var rect = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(3, 3), new EndGate.Size2d(6, 6));

        QUnit.ok(rect.TopLeft().Equivalent(EndGate.Vector2d.Zero()));
        QUnit.ok(rect.TopRight().Equivalent(new EndGate.Vector2d(6, 0)));
        QUnit.ok(rect.BotLeft().Equivalent(new EndGate.Vector2d(0, 6)));
        QUnit.ok(rect.BotRight().Equivalent(new EndGate.Vector2d(6, 6)));

        rect.Position = rect.Position.Subtract(6);
        QUnit.ok(rect.TopLeft().Equivalent(new EndGate.Vector2d(-6, -6)));
        QUnit.ok(rect.TopRight().Equivalent(new EndGate.Vector2d(0, -6)));
        QUnit.ok(rect.BotLeft().Equivalent(new EndGate.Vector2d(-6, 0)));
        QUnit.ok(rect.BotRight().Equivalent(EndGate.Vector2d.Zero()));
    });

    QUnit.test("Rotated Rectangle Corners Get works", function () {
        var rect = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(3, 2), new EndGate.Size2d(4, 2));
        rect.Rotation = -Math.PI / 2;

        var topLeft = rect.TopLeft().Clone();
        topRight = rect.TopRight().Clone(),
        botLeft = rect.BotLeft().Clone(),
        botRight = rect.BotRight().Clone();

        topLeft.Apply(Math.round);
        topRight.Apply(Math.round);
        botLeft.Apply(Math.round);
        botRight.Apply(Math.round);

        QUnit.ok(topLeft.Equivalent(new EndGate.Vector2d(2, 4)));
        QUnit.ok(topRight.Equivalent(new EndGate.Vector2d(2, 0)));
        QUnit.ok(botLeft.Equivalent(new EndGate.Vector2d(4, 4)));
        QUnit.ok(botRight.Equivalent(new EndGate.Vector2d(4, 0)));
    });

    QUnit.test("Un-rotated Rectangle Collides Correctly", function () {
        var rect1 = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(5, 3), new EndGate.Size2d(10, 6)),
            rect2 = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(5, 3), new EndGate.Size2d(3, 3));

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
        var rect1 = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(2.5, 2.5), new EndGate.Size2d(4.24, 2.83));
        rect1.Rotation = -Math.PI / 4;

        var rect2 = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(9, 4), new EndGate.Size2d(6, 4));

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
        rect2.Position = rect2.Position.Subtract(1);

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
        var rect = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(3, 2), new EndGate.Size2d(6, 4)),
            vertices,
            vertex;

        vertices = rect.Corners();

        QUnit.ok(rect.ContainsPoint(rect.Position));

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            QUnit.ok(rect.ContainsPoint(vertex));
        }

        QUnit.ok(!rect.ContainsPoint(new EndGate.Vector2d(-1, 0)));
        QUnit.ok(!rect.ContainsPoint(rect.TopRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.TopLeft().Subtract(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotLeft().Subtract(1)));
    });

    QUnit.test("Rotated rectangle contains point works.", function () {
        var rect = new EndGate.Bounds.BoundingRectangle(new EndGate.Vector2d(2.5, 2.5), new EndGate.Size2d(4.24, 2.83)),
            vertices,
            vertex;

        rect.Rotation = Math.PI / 4;

        vertices = rect.Corners();

        QUnit.ok(rect.ContainsPoint(rect.Position));

        for (var i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            QUnit.ok(rect.ContainsPoint(vertex));
        }

        QUnit.ok(!rect.ContainsPoint(new EndGate.Vector2d(-1, 0)));

        QUnit.ok(!rect.ContainsPoint(rect.TopRight().Add(1)));

        QUnit.ok(!rect.ContainsPoint(rect.BotRight().Add(1)));
        QUnit.ok(!rect.ContainsPoint(rect.TopLeft().Subtract(1)));
        QUnit.ok(!rect.ContainsPoint(rect.BotLeft().Subtract(1)));

        QUnit.ok(rect.ContainsPoint(rect.TopRight().Subtract(1)));
        QUnit.ok(rect.ContainsPoint(rect.BotRight().Subtract(1)));
        QUnit.ok(rect.ContainsPoint(rect.TopLeft().Add(1)));
        QUnit.ok(rect.ContainsPoint(rect.BotLeft().Add(1)));
    });

})();