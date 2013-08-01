/// <reference path="../../../Scripts/endgate.js" />

(function () {
    var calculateSize = function (obj) {
        var size = 0;

        for (var key in obj) {
            size++;
        }

        return size;
    };

    QUnit.module("KeyboardHandler Facts");

    QUnit.test("KeyboardHandler dispose unbinds all active bindings.", function () {
        var keyboardHandler = new eg.Input.KeyboardHandler();

        keyboardHandler.OnKeyDown.Bind(function () { });
        keyboardHandler.OnKeyUp.Bind(function () { });
        keyboardHandler.OnKeyPress.Bind(function () { });
        keyboardHandler.OnCommandDown("f", function () { });
        keyboardHandler.OnCommandUp("f", function () { });
        keyboardHandler.OnCommandPress("f", function () { });

        QUnit.isTrue(keyboardHandler.OnKeyDown.HasBindings());
        QUnit.isTrue(keyboardHandler.OnKeyUp.HasBindings());
        QUnit.isTrue(keyboardHandler.OnKeyPress.HasBindings());
        QUnit.ok(calculateSize(keyboardHandler._onDownCommands) > 0);
        QUnit.ok(calculateSize(keyboardHandler._onUpCommands) > 0);
        QUnit.ok(calculateSize(keyboardHandler._onPressCommands) > 0);

        keyboardHandler.Dispose();

        QUnit.isFalse(keyboardHandler.OnKeyDown.HasBindings());
        QUnit.isFalse(keyboardHandler.OnKeyUp.HasBindings());
        QUnit.isFalse(keyboardHandler.OnKeyPress.HasBindings());
        QUnit.equal(keyboardHandler._onDownCommands, null);
        QUnit.equal(keyboardHandler._onUpCommands, null);
        QUnit.equal(keyboardHandler._onPressCommands, null);
    });

    QUnit.test("KeyboardHandler dispose cannot be called twice.", function () {
        var keyboardHandler = new eg.Input.KeyboardHandler();

        keyboardHandler.Dispose();

        QUnit.throws(function () {
            keyboardHandler.Dispose();
        });
    });

})();
