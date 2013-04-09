/// <reference path="../Assets.js" />

(function (window, lib) {


    QUnit.module("Game Facts");

    QUnit.asyncTimeoutTest("Classes inheriting game have update called.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var onComplete,
            game = new UpdateTester(40, function () {
                assert.ok(true, "Limit reached!");
                game.Dispose();
                window.setTimeout(onComplete, 1000);
            }, 40);

        onComplete = function () {
            assert.equal(game.UpdateCount, 40, "Game updated 40 times!");
            end();
        };

        return function () {
            game.Dispose();
        };
    });

})(window, EndGate.Core);