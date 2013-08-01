/// <reference path="../../Scripts/endgate.js" />

(function () {

    QUnit.module("InputManager Facts");

    QUnit.test("InputManager dispose disposes its mouse and keyboard handler.", function () {
        var inputManager = new eg.Input.InputManager(document.createElement("div"));

        inputManager.Dispose();

        QUnit.isTrue(inputManager.Mouse._disposed);
        QUnit.isTrue(inputManager.Keyboard._disposed);
    });

    QUnit.test("InputManager dispose cannot be called twice.", function () {
        var inputManager = new eg.Input.InputManager(document.createElement("div"));

        inputManager.Dispose();

        QUnit.throws(function () {
            inputManager.Dispose();
        });
    });

})();
