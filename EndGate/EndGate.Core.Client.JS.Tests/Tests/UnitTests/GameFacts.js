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

    QUnit.asyncTimeoutTest("Classes inheriting game are run individually.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var triggered1 = false,
            triggered2 = false,
            game1 = new UpdateTester(60, function () {
                assert.ok(true, "Limit reached for game1!");
                triggered1 = true;
                game1.Dispose();
            }, 60),
            game2 = new UpdateTester(40, function () {
                assert.ok(true, "Limit reached for game2!");
                triggered2 = true;
                game2.Dispose();
            }, 40);

        window.setTimeout(function () {
            assert.ok(triggered1, "First onComplete triggered in time.");
            assert.ok(triggered2, "Second onComplete triggered in time.");
            assert.equal(game1.UpdateCount, 60, "Game1 updated 60 times.");
            assert.equal(game2.UpdateCount, 40, "Game2 updated 40 times.");
            end();
        }, 1010);

        return function () {
            game1.Dispose();
            game2.Dispose();
        };
    });

})(window, EndGate.Core);