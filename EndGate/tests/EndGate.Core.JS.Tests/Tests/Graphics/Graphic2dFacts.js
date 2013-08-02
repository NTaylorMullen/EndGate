/// <reference path="../../Scripts/endgate.js" />

(function () {

    QUnit.module("Graphic2d Facts");

    QUnit.test("Absolute Position calculates position correctly.", function () {
        var parent = new eg.Graphics.Circle(30, 30, 3),
            parent2 = new eg.Graphics.Circle(30, 30, 3),
            child = new eg.Graphics.Circle(-10, 0, 3);

        parent.AddChild(parent2);
        parent2.AddChild(child);

        QUnit.isTrue(parent.AbsolutePosition.Equivalent(new eg.Vector2d(30, 30)));
        QUnit.isTrue(parent2.AbsolutePosition.Equivalent(new eg.Vector2d(60, 60)));
        QUnit.isTrue(child.AbsolutePosition.Equivalent(new eg.Vector2d(50, 60)));

        parent.RemoveChild(parent2);

        QUnit.isTrue(parent.AbsolutePosition.Equivalent(new eg.Vector2d(30, 30)));
        QUnit.isTrue(parent2.AbsolutePosition.Equivalent(new eg.Vector2d(30, 30)));
        QUnit.isTrue(child.AbsolutePosition.Equivalent(new eg.Vector2d(20, 30)));

        parent2.RemoveChild(child);

        QUnit.isTrue(parent.AbsolutePosition.Equivalent(parent.Position));
        QUnit.isTrue(parent2.AbsolutePosition.Equivalent(parent2.Position));
        QUnit.isTrue(child.AbsolutePosition.Equivalent(child.Position));
    });

    QUnit.test("Graphic2d children are removed from Parent on dispose.", function () {
        var parent = new eg.Graphics.Circle(0, 0, 3),
            child = new eg.Graphics.Circle(0, 0, 3);

        parent.AddChild(child);

        QUnit.equal(parent.Children().length, 1);

        child.Dispose();

        QUnit.equal(child.Parent, null);
        QUnit.isFalse(child.OnDisposed.HasBindings());
        QUnit.equal(parent.Children().length, 0);
    });

    QUnit.test("Graphic2d's cannot AddChild a graphic that already has a parent.", function () {
        var parent = new eg.Graphics.Circle(0, 0, 3),
            parent2 = new eg.Graphics.Circle(0, 0, 3),
            child = new eg.Graphics.Circle(0, 0, 3);

        parent.AddChild(child);

        QUnit.throws(function () {
            parent2.AddChild(child);
        });
    });

    QUnit.test("Graphic2d's have Parent's member set on AddChild and unset on RemoveChild.", function () {
        var parent = new eg.Graphics.Circle(0, 0, 3),
            child = new eg.Graphics.Circle(0, 0, 3);

        parent.AddChild(child);

        QUnit.deepEqual(child.Parent, parent);

        parent.RemoveChild(child);

        QUnit.equal(child.Parent, null);

        parent.AddChild(child);

        QUnit.deepEqual(child.Parent, parent);
    });

    QUnit.test("Graphic2d's have children's draw triggered.", function () {
        var parent = new eg.Graphics.Circle(0,0,3),
            child = new eg.Graphics.Circle(0,0,3),
            dummyCanvas = document.createElement("canvas"),
            drawCalled = false;

        parent.AddChild(child);

        child.Draw = function () {
            drawCalled = true;
        };

        parent.Draw(dummyCanvas.getContext("2d"));

        QUnit.ok(drawCalled);
    });

    QUnit.test("Graphic2d's children are not called if not visible.", function () {
        var parent = new eg.Graphics.Circle(0, 0, 3),
            child = new eg.Graphics.Circle(0, 0, 3),
            dummyCanvas = document.createElement("canvas"),
            drawCalled = false;

        parent.AddChild(child);

        child.Visible = false;

        child.Draw = function () {
            drawCalled = true;
        };

        parent.Draw(dummyCanvas.getContext("2d"));

        QUnit.ok(!drawCalled);
    });

})();
