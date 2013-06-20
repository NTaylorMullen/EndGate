(function () {

    QUnit.module("Scene2d Facts");

    QUnit.test("Renderables added have draw triggered.", function () {
        var scene = new eg.Rendering.Scene2d(),
            draws1 = 0,
            draws2 = 0,
            renderable1 = {
                Draw: function (context) {
                    draws1++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero(), 5);
                },
                Visible: true
            },
            renderable2 = {
                Draw: function (context) {
                    draws2++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero(), 5);
                },
                Visible: true
            };

        scene.Add(renderable1);
        scene.Add(renderable2);

        QUnit.equal(draws1, 0);
        QUnit.equal(draws1, draws2);

        scene.Draw();

        QUnit.equal(draws1, 1);
        QUnit.equal(draws1, draws2);

        scene.Remove(renderable1);

        scene.Draw();

        QUnit.equal(draws1, 1);
        QUnit.equal(draws2, 2);

        scene.Remove(renderable2);

        scene.Draw();

        QUnit.equal(draws1, 1);
        QUnit.equal(draws2, 2);

        scene.Dispose();
    });

    QUnit.test("Dispose removes all actors.", function () {
        var scene = new eg.Rendering.Scene2d(),
            draws1 = 0,
            draws2 = 0,
            renderable1 = {
                Draw: function (context) {
                    draws1++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero(), 5);
                },
                Visible: true
            },
            renderable2 = {
                Draw: function (context) {
                    draws2++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero(), 5);
                },
                Visible: true
            };

        scene.Add(renderable1);
        scene.Add(renderable2);

        QUnit.equal(draws1, 0);
        QUnit.equal(draws1, draws2);

        scene.Draw();

        QUnit.equal(draws1, 1);
        QUnit.equal(draws1, draws2);

        scene.Dispose();

        scene.Draw();

        QUnit.equal(draws1, 1);
        QUnit.equal(draws1, draws2);
    });

})();
