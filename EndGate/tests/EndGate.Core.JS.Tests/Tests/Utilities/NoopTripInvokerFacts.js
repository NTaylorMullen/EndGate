 (function (window) {

    QUnit.module("Noop Trip Invoker Facts");

    QUnit.test("Actions are not triggered prior to trip.", function () {
        var triggered = false,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered = true;
            });

        QUnit.equal(triggered, false);

        tripInvoker.Invoke();
        tripInvoker.Invoke();
        tripInvoker.Invoke();

        QUnit.equal(triggered, false);
    });

    QUnit.test("Actions are not instantly triggered after trip.", function () {
        var triggered = false,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered = true;
            });

        QUnit.equal(triggered, false);

        tripInvoker.Invoke();
        
        QUnit.equal(triggered, false);

        tripInvoker.Trip();

        QUnit.equal(triggered, false);
    });

    QUnit.test("Actions are triggered once tripped and Invoke is called.", function () {
        var triggered = false,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered = true;
            });

        QUnit.equal(triggered, false);

        tripInvoker.Invoke();

        QUnit.equal(triggered, false);

        tripInvoker.Trip();

        QUnit.equal(triggered, false);

        tripInvoker.Invoke();

        QUnit.equal(triggered, true);

        triggered = false;

        tripInvoker.Invoke();

        QUnit.equal(triggered, true);
    });

    QUnit.test("Actions are still triggered if trip is called more than once.", function () {
        var triggered = false,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered = true;
            });

        QUnit.equal(triggered, false);

        tripInvoker.Invoke();

        QUnit.equal(triggered, false);

        tripInvoker.Trip();
        tripInvoker.Trip();
        tripInvoker.Trip();

        QUnit.equal(triggered, false);

        tripInvoker.Invoke();

        QUnit.equal(triggered, true);

        triggered = false;

        tripInvoker.Trip();
        tripInvoker.Trip();
        tripInvoker.Trip();

        tripInvoker.Invoke();

        QUnit.equal(triggered, true);
    });

    QUnit.test("Invoke Once doesn't allow multiple invokes", function () {
        var triggered = 0,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered++;
            });

        QUnit.equal(triggered, 0);

        tripInvoker.Trip();

        tripInvoker.InvokeOnce();
        tripInvoker.Invoke();
        tripInvoker.InvokeOnce();
        tripInvoker.Invoke();

        QUnit.equal(triggered, 1);

        tripInvoker.Trip();

        tripInvoker.Invoke();
        tripInvoker.Invoke();
        tripInvoker.InvokeOnce()
        tripInvoker.Invoke();

        QUnit.equal(triggered, 4);
    });

    QUnit.test("Constructor trip argument causes object to already be tripped.", function () {
        var triggered = 0,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered++;
            }, true);

        QUnit.equal(triggered, 0);

        tripInvoker.InvokeOnce();
        tripInvoker.Invoke();
        tripInvoker.InvokeOnce();
        tripInvoker.Invoke();

        QUnit.equal(triggered, 1);

        tripInvoker.Trip();

        tripInvoker.Invoke();
        tripInvoker.Invoke();
        tripInvoker.InvokeOnce()
        tripInvoker.Invoke();

        QUnit.equal(triggered, 4);
    });

    QUnit.test("Constructor trip argument causes object to already be tripped.", function () {
        var triggered = 0,
            tripInvoker = new eg._.Utilities.NoopTripInvoker(function () {
                triggered++;
            }, true);

        QUnit.equal(triggered, 0);

        tripInvoker.Invoke();
        tripInvoker.Invoke();

        QUnit.equal(triggered, 2);

        tripInvoker.Reset();

        tripInvoker.Invoke();
        tripInvoker.Invoke();
        tripInvoker.InvokeOnce()
        tripInvoker.Invoke();

        QUnit.equal(triggered, 2);

        tripInvoker.Trip();

        tripInvoker.InvokeOnce();
        tripInvoker.Invoke();

        QUnit.equal(triggered, 3);
    });

})(window);