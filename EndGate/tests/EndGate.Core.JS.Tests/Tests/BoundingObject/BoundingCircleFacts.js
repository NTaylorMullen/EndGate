(function () {

    QUnit.module("Bounding Circle Facts");

    QUnit.test("Area Works", function () {
        var obj = new eg.Bounds.BoundingCircle(eg.Vector2d.Zero(), 10);

        QUnit.equal(Math.round(obj.Area()), 314);
    });

    QUnit.test("Circumference Works", function () {
        var obj = new eg.Bounds.BoundingCircle(eg.Vector2d.Zero(), 10);

        QUnit.equal(Math.round(obj.Circumference()), 63);
    });

    QUnit.test("Is colliding with other circle works", function () {
        var circle1 = new eg.Bounds.BoundingCircle(new eg.Vector2d(10, 5), 10);
        var circle2 = new eg.Bounds.BoundingCircle(new eg.Vector2d(17, 5), 6);

        QUnit.ok(circle1.Intersects(circle2));

        circle2.Position.X = -5;

        QUnit.ok(circle1.Intersects(circle2));

        circle2.Position.X = -6;

        QUnit.ok(!circle1.Intersects(circle2));
    });

    QUnit.test("Is colliding with other rectangle works", function () {
        var rect = new eg.Bounds.BoundingRectangle(new eg.Vector2d(5, 3), new eg.Size2d(10, 6));
        var circle = new eg.Bounds.BoundingCircle(new eg.Vector2d(14, 3), 3);

        QUnit.ok(!circle.Intersects(rect));
        circle.Position.X--;
        QUnit.ok(circle.Intersects(rect));
        rect.Rotation = Math.PI * .5;
        rect.Position.X = 3;
        rect.Position.Y = 5;

        circle.Position.X = 8;
        circle.Position.Y = 12;

        QUnit.ok(circle.Intersects(rect));

        circle = new eg.Bounds.BoundingCircle(new eg.Vector2d(156, 165), 50);
        rect = new eg.Bounds.BoundingRectangle(new eg.Vector2d(300, 200), new eg.Size2d(200, 100));

        QUnit.ok(circle.Intersects(rect));
    });

    QUnit.test("Contain point works", function () {
        var circle = new eg.Bounds.BoundingCircle(new eg.Vector2d(10, 5), 10);

        QUnit.ok(!circle.ContainsPoint(eg.Vector2d.Zero()));
        QUnit.ok(circle.ContainsPoint(new eg.Vector2d(3, 3)));
    });

})();