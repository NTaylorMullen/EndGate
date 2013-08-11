/// <reference path="../Scripts/endgate.js" />
/// <reference path="Assets.js" />

(function (window) {

    QUnit.module("Game Facts");

    QUnit.test("Game dispose removes all canvases from holder.", function () {
        var canvas = document.createElement("canvas"),
            holder = document.createElement("div"),
            game;

        holder.appendChild(canvas);

        game = new eg.Game(canvas);

        QUnit.equal(holder.children.length, 1);
        game.Dispose();
        QUnit.equal(holder.children.length, 0);
    });

    QUnit.asyncTimeoutTest("Classes inheriting game have update called.", 10000, function (end, assert, testName) {
        var onComplete,
            disposed = false,
            disposeGame,
            game = new UpdateTester(40, function () {
                assert.ok(true, "Limit reached!");
                disposeGame();
                window.setTimeout(onComplete, 1000);
            }, 40);

        disposeGame = function () {
            game.Dispose();
            disposeGame = function () { };
        };

        onComplete = function () {
            assert.equal(game.UpdateCount, 40, "Game updated 40 times!");
            end();
        };

        return function () {
            disposeGame();
        };
    });

    QUnit.asyncTimeoutTest("Classes inheriting game have draw called.", 10000, function (end, assert, testName) {
        var onComplete,
            disposeGame,
            game = new DrawTester(function () {
                assert.ok(true, "Limit reached!");
                disposeGame();
                window.setTimeout(onComplete, 1000);
            }, 40);


        disposeGame = function () {
            game.Dispose();
            disposeGame = function () { };
        };

        onComplete = function () {
            assert.equal(game.DrawCount, 40, "Game drew 40 times!");
            end();
        };

        return function () {
            disposeGame();
        };
    });

    QUnit.asyncTimeoutTest("Classes inheriting game have update run individually.", 10000, function (end, assert, testName) {
        var triggered1 = false,
            triggered2 = false,
            disposeGame1,
            disposeGame2,
            game1 = new UpdateTester(60, function () {
                assert.ok(true, "Limit reached for game1!");
                triggered1 = true;
                disposeGame1();
            }, 60),
            game2 = new UpdateTester(40, function () {
                assert.ok(true, "Limit reached for game2!");
                triggered2 = true;
                disposeGame2();
            }, 40);

        disposeGame1 = function () {
            game1.Dispose();
            disposeGame1 = function () { };
        };

        disposeGame2 = function () {
            game2.Dispose();
            disposeGame2 = function () { };
        };

        window.setTimeout(function () {
            assert.ok(triggered1, "First onComplete triggered in time.");
            assert.ok(triggered2, "Second onComplete triggered in time.");
            assert.equal(game1.UpdateCount, 60, "Game1 updated 60 times.");
            assert.equal(game2.UpdateCount, 40, "Game2 updated 40 times.");
            end();
        }, 1200);

        return function () {
            disposeGame1();
            disposeGame2();
        };
    });

    QUnit.asyncTimeoutTest("Classes inheriting game have draw run individually.", 10000, function (end, assert, testName) {
        var triggered1 = false,
            triggered2 = false,
            tryComplete,
            disposeGame1,
            disposeGame2,
            game1 = new DrawTester(function () {
                assert.ok(true, "Limit reached for game1!");
                triggered1 = true;
                disposeGame1();
                tryComplete();
            }, 60),
            game2 = new DrawTester(function () {
                assert.ok(true, "Limit reached for game2!");
                triggered2 = true;
                disposeGame2();
                tryComplete();
            }, 40);

        disposeGame1 = function () {
            game1.Dispose();
            disposeGame1 = function () { };
        };

        disposeGame2 = function () {
            game2.Dispose();
            disposeGame2 = function () { };
        };

        tryComplete = function () {
            if (triggered1 && triggered2) {
                assert.equal(game1.DrawCount, 60, "Game1 drew 60 times.");
                assert.equal(game2.DrawCount, 40, "Game2 drew 40 times.");
                end();
            }
        };

        return function () {
            disposeGame1();
            disposeGame2();
        };
    });

})(window);