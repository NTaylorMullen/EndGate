(function (window, lib) {

    QUnit.module("Noop Trip Invoker Facts");

    QUnit.test("Actions are not triggered prior to trip.", function () {
        var triggered = false,
            tripInvoker = new EndGate.Core.Utilities.NoopTripInvoker(function () {
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
            tripInvoker = new EndGate.Core.Utilities.NoopTripInvoker(function () {
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
            tripInvoker = new EndGate.Core.Utilities.NoopTripInvoker(function () {
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
            tripInvoker = new EndGate.Core.Utilities.NoopTripInvoker(function () {
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

})(window, EndGate.Core.Utilities);