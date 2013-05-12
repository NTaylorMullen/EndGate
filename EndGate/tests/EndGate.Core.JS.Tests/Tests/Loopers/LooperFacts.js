(function () {

    QUnit.module("Looper Facts");

    QUnit.asyncTimeoutTest("Looper single callback works.", 10000, function (end, assert, testName) {
        var updates = 0,
            triggered = false,
            gameLoop = new EndGate._.Loopers.Looper(),
            onComplete = function () {
                assert.equal(updates, 30, "Updates have hit 30!");
                end();
            },
            timedCallback = new EndGate._.Loopers.TimedCallback(30, function () {
                updates++;
                if (updates >= 30) {
                    triggered = true;
                    gameLoop.Dispose();
                    window.setTimeout(onComplete, 1000);
                }
            });

        gameLoop.AddCallback(timedCallback);
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

    QUnit.asyncTimeoutTest("Looper multiple callback works.", 10000, function (end, assert, testName) {
        var updates = 0,
            triggered = false,
            gameLoop = new EndGate._.Loopers.Looper(),
            onComplete = function () {
                assert.equal(updates, -30, "Updates have hit -30!");
                end();
            },
            timedCallback1 = new EndGate._.Loopers.TimedCallback(30, function () {
                updates++;                
            }),
            timedCallback2 = new EndGate._.Loopers.TimedCallback(60, function () {
                updates--;

                if (updates <= -30) {
                    triggered = true;
                    gameLoop.Dispose();
                    window.setTimeout(onComplete, 1000);
                }
            });

        gameLoop.AddCallback(timedCallback1);
        gameLoop.AddCallback(timedCallback2);
        gameLoop.Start();

        window.setTimeout(function () {
            if (!triggered) {
                assert.ok(false, "Loop did not finish in time!");
                end();
            }
        }, 1100);

        return function () {
            gameLoop.Dispose();
        };
    });

})();