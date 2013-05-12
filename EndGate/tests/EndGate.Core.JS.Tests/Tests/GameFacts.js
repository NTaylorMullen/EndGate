/// <reference path="Assets.js" />

(function (window) {

    QUnit.module("Game Facts");

    QUnit.asyncTimeoutTest("Classes inheriting game have update called.", 10000, function (end, assert, testName) {
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

    QUnit.asyncTimeoutTest("Classes inheriting game have draw called.", 10000, function (end, assert, testName) {
        var onComplete,
            game = new DrawTester(function () {
                assert.ok(true, "Limit reached!");
                game.Dispose();
                window.setTimeout(onComplete, 1000);
            }, 40);

        onComplete = function () {
            assert.equal(game.DrawCount, 40, "Game drew 40 times!");
            end();
        };

        return function () {
            game.Dispose();
        };
    });

    QUnit.asyncTimeoutTest("Classes inheriting game have update run individually.", 10000, function (end, assert, testName) {
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
        }, 1200);

        return function () {
            game1.Dispose();
            game2.Dispose();
        };
    });

    QUnit.asyncTimeoutTest("Classes inheriting game have draw run individually.", 10000, function (end, assert, testName) {
        var triggered1 = false,
            triggered2 = false,
            tryComplete;
            game1 = new DrawTester(function () {
                assert.ok(true, "Limit reached for game1!");
                triggered1 = true;
                game1.Dispose();
                tryComplete();
            }, 60),
            game2 = new DrawTester(function () {
                assert.ok(true, "Limit reached for game2!");
                triggered2 = true;
                game2.Dispose();
                tryComplete();
            }, 40);

        tryComplete = function () {
            if (triggered1 && triggered2) {
                assert.equal(game1.DrawCount, 60, "Game1 drew 60 times.");
                assert.equal(game2.DrawCount, 40, "Game2 drew 40 times.");
                end();
            }
        };

        return function () {
            game1.Dispose();
            game2.Dispose();
        };
    });

})(window);