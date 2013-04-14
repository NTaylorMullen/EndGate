(function (window, lib) {

    QUnit.module("Repaint Looper Facts");

    QUnit.asyncTimeoutTest("Repaint Looper single callback works.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var updates = 0,
            triggered = false,
            gameLoop = new lib.RepaintLooper(),
            onComplete = function () {
                assert.equal(updates, 20, "Updates have hit 20!");
                end();
            },
            looperCallback = new lib.LooperCallback(function () {
                updates++;
                if (updates >= 20) {
                    triggered = true;
                    gameLoop.Dispose();
                    window.setTimeout(onComplete, 1000);
                }
            });

        gameLoop.AddCallback(looperCallback);
        gameLoop.Start();

        window.setTimeout(function () {
            if (!triggered) {
                assert.ok(false, "Loop did not finish in time!");
                end();
            }
        }, 1200);

        return function () {
            gameLoop.Dispose();
        };
    });

    QUnit.asyncTimeoutTest("Repaint Looper multiple callback works.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var updates1 = 0,
            updates2 = 0,
            gameLoop = new lib.Looper(),
            onComplete = function () {
                assert.eqokual(updates, -30, "Updates have hit -30!");
                end();
            },
            looperCallback1 = new lib.LooperCallback(function () {
                updates1++;
            }),
            looperCallback2 = new lib.LooperCallback(function () {
                updates2--;
            });

        gameLoop.AddCallback(looperCallback1);
        gameLoop.AddCallback(looperCallback2);
        gameLoop.Start();

        window.setTimeout(function () {
            assert.ok(updates1 >= 20, "Loop1 updated more than 20 times!");
            assert.ok(updates2 <= 20, "Loop2 updated more than 20 times!");
            assert.equal(updates1, updates2 * -1, "Loop1 updated the same amount of times as update2.");
            end();
        }, 1000);

        return function () {
            gameLoop.Dispose();
        };
    });

})(window, EndGate.Core.Loopers);