/// <reference path="../../../Scripts/endgate.js" />

(function () {

    QUnit.module("MouseHandler Facts");

    QUnit.test("MouseHandler dispose unbinds all active bindings.", function () {
        var mouseHandler = new eg.Input.MouseHandler(document.createElement("div"));

        mouseHandler.OnClick.Bind(function () { });
        mouseHandler.OnDoubleClick.Bind(function () { });
        mouseHandler.OnDown.Bind(function () { });
        mouseHandler.OnMove.Bind(function () { });
        mouseHandler.OnScroll.Bind(function () { });
        mouseHandler.OnUp.Bind(function () { });

        QUnit.isTrue(mouseHandler.OnClick.HasBindings());
        QUnit.isTrue(mouseHandler.OnDoubleClick.HasBindings());
        QUnit.isTrue(mouseHandler.OnDown.HasBindings());
        QUnit.isTrue(mouseHandler.OnMove.HasBindings());
        QUnit.isTrue(mouseHandler.OnScroll.HasBindings());
        QUnit.isTrue(mouseHandler.OnUp.HasBindings());

        mouseHandler.Dispose();

        QUnit.isFalse(mouseHandler.OnClick.HasBindings());
        QUnit.isFalse(mouseHandler.OnDoubleClick.HasBindings());
        QUnit.isFalse(mouseHandler.OnDown.HasBindings());
        QUnit.isFalse(mouseHandler.OnMove.HasBindings());
        QUnit.isFalse(mouseHandler.OnScroll.HasBindings());
        QUnit.isFalse(mouseHandler.OnUp.HasBindings());
    });

    QUnit.test("MouseHandler dispose cannot be called twice.", function () {
        var mouseHandler = new eg.Input.MouseHandler(document.createElement("div"));

        mouseHandler.Dispose();

        QUnit.throws(function () {
            mouseHandler.Dispose();
        });
    });

})();
