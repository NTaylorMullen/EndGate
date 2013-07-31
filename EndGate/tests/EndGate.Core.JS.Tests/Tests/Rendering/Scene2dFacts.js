(function () {

    QUnit.module("Scene2d Facts");

    QUnit.test("Dispose unbinds all actors OnDisposed events.", function () {
        var scene = new eg.Rendering.Scene2d(),
        actor = new eg.Graphics.Circle(100, 100, 30);

        QUnit.ok(!actor.OnDisposed.HasBindings());

        scene.Add(actor);

        QUnit.ok(actor.OnDisposed.HasBindings());

        scene.Dispose();

        QUnit.ok(!actor.OnDisposed.HasBindings());
    });

    QUnit.test("Adding and removing actors multiple times does not leak OnDisposed event handler bindings.", function () {
        var scene = new eg.Rendering.Scene2d(),
            actor = new eg.Graphics.Circle(100, 100, 30),
            disposesTriggered = 0;

        actor.OnDisposed.Bind(function () {
            disposesTriggered++;
        });

        scene.Add(actor);
        scene.Remove(actor);
        scene.Add(actor);
        scene.Remove(actor);
        scene.Add(actor);
        scene.Remove(actor);
        scene.Add(actor);

        actor.Dispose();

        QUnit.equal(disposesTriggered, 1);
    });

    QUnit.test("Renderables added have draw triggered.", function () {
        var scene = new eg.Rendering.Scene2d(),
            draws1 = 0,
            draws2 = 0,
            renderable1 = {
                Draw: function (context) {
                    draws1++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero, 5);
                },
                Visible: true,
                OnDisposed: new EndGate.EventHandler1()
            },
            renderable2 = {
                Draw: function (context) {
                    draws2++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero, 5);
                },
                Visible: true,
                OnDisposed: new EndGate.EventHandler1()
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
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero, 5);
                },
                Visible: true,
                OnDisposed: new EndGate.EventHandler1()
            },
            renderable2 = {
                Draw: function (context) {
                    draws2++;
                },
                GetDrawBounds: function () {
                    return new eg.Bounds.BoundingCircle(eg.Vector2d.Zero, 5);
                },
                Visible: true,
                OnDisposed: new EndGate.EventHandler1()
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
