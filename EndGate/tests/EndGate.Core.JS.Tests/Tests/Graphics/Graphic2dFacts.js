/// <reference path="../../Scripts/endgate.js" />

(function () {

    QUnit.module("Graphic2d Facts");

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
