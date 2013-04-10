(function (window, lib) {

    QUnit.module("Looper Facts");

    QUnit.asyncTimeoutTest("Looper single callback works.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var updates = 0,
            triggered = false,
            gameLoop = new lib.Looper(),
            onComplete = function () {
                assert.equal(updates, 30, "Updates have hit 30!");
                end();
            },
            looperCallback = new lib.LooperCallback(30, function () {
                updates++;
                if (updates >= 30) {
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
        }, 1050);

        return function () {
            gameLoop.Dispose();
        };
    });

    QUnit.asyncTimeoutTest("Looper multiple callback works.", testUtilities.defaultTestTimeout, function (end, assert, testName) {
        var updates = 0,
            triggered = false,
            gameLoop = new lib.Looper(),
            onComplete = function () {
                assert.equal(updates, -30, "Updates have hit -30!");
                end();
            },
            looperCallback1 = new lib.LooperCallback(30, function () {
                updates++;                
            }),
            looperCallback2 = new lib.LooperCallback(60, function () {
                updates--;

                if (updates <= -30) {
                    triggered = true;
                    gameLoop.Dispose();
                    window.setTimeout(onComplete, 1000);
                }
            });

        gameLoop.AddCallback(looperCallback1);
        gameLoop.AddCallback(looperCallback2);
        gameLoop.Start();

        window.setTimeout(function () {
            if (!triggered) {
                assert.ok(false, "Loop did not finish in time!");
                end();
            }
        }, 1050);

        return function () {
            gameLoop.Dispose();
        };
    });

})(window, EndGate.Core.Utilities);