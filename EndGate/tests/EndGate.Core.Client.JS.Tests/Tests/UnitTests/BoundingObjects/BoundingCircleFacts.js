(function (window, bo, assets) {

    QUnit.module("Bounding Circle Facts");

    QUnit.test("Area Works", function () {
        var obj = new bo.BoundingCircle(10);

        QUnit.equal(Math.round(obj.Area()), 314);
    });

    QUnit.test("Circumference Works", function () {
        var obj = new bo.BoundingCircle(10);

        QUnit.equal(Math.round(obj.Circumfrence()), 63);
    });

    QUnit.test("Is colliding with other circle works", function () {
        var circle1 = new bo.BoundingCircle(10);
        circle1.Position = new assets.Vector2d(10, 5);

        var circle2 = new bo.BoundingCircle(6);
        circle2.Position = new assets.Vector2d(17, 5);

        QUnit.ok(circle1.Intersects(circle2));

        circle2.Position.X = -5;

        QUnit.ok(circle1.Intersects(circle2));

        circle2.Position.X = -6;

        QUnit.ok(!circle1.Intersects(circle2));
    });

    QUnit.test("Is colliding with other rectangle works", function () {
        var rect = new bo.BoundingRectangle(10, 6);
        rect.Position = new assets.Vector2d(5, 3);

        var circle = new bo.BoundingCircle(3);
        circle.Position = new assets.Vector2d(13, 3);

        QUnit.ok(!circle.Intersects(rect));
        circle.Position.X--;
        QUnit.ok(circle.Intersects(rect));
        rect.Rotation = Math.PI * .5;
        rect.Position.X = 3;
        rect.Position.Y = 5;

        circle.Position.X = 8;
        circle.Position.Y = 12;

        QUnit.ok(circle.Intersects(rect));
    });

    QUnit.test("Is colliding with other rectangle works", function () {
        var circle = new bo.BoundingCircle(10);
        circle.Position = new assets.Vector2d(10, 5);

        QUnit.ok(!circle.ContainsPoint(assets.Vector2d.Zero()));
        QUnit.ok(circle.ContainsPoint(new assets.Vector2d(3, 3)));
    });

})(window, EndGate.Core.BoundingObject, EndGate.Core.Assets);