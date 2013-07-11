(function () {

    QUnit.module("TimeSpan Facts");

    QUnit.test("Creation of TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(1);
        QUnit.equal(timeSpan1.Milliseconds, 1);
        QUnit.equal(timeSpan1.Seconds, 1 / 1000);
        QUnit.equal(timeSpan1.Minutes, (1 / 1000) / 60);

        var timeSpan2 = new EndGate.TimeSpan(1, 1);
        QUnit.equal(timeSpan2.Milliseconds, 1001);
        QUnit.equal(timeSpan2.Seconds, 1001 / 1000);
        QUnit.equal(timeSpan2.Minutes, (1001 / 1000) / 60);

        var timeSpan3 = new EndGate.TimeSpan(1, 1, 1);
        QUnit.equal(timeSpan3.Milliseconds, 61001);
        QUnit.equal(timeSpan3.Seconds, 61001 / 1000);
        QUnit.equal(timeSpan3.Minutes, (61001 / 1000) / 60);

    });

    QUnit.test("Set milliseconds", function () {
        var timeSpan1 = new EndGate.TimeSpan(4);
        QUnit.equal(timeSpan1.Milliseconds, 4);
        timeSpan1.Milliseconds = 1;
        QUnit.equal(timeSpan1.Milliseconds, 1);
        QUnit.equal(timeSpan1.Seconds, 1 / 1000);
        QUnit.equal(timeSpan1.Minutes, (1 / 1000) / 60);
    });

    QUnit.test("Set seconds", function () {
        var timeSpan1 = new EndGate.TimeSpan(0, 4);
        QUnit.equal(timeSpan1.Seconds, 4);
        timeSpan1.Seconds = 1;
        QUnit.equal(timeSpan1.Milliseconds, 1000);
        QUnit.equal(timeSpan1.Seconds, 1000 / 1000);
        QUnit.equal(timeSpan1.Minutes, (1000 / 1000) / 60);
    });

    QUnit.test("Set minutes", function () {
        var timeSpan1 = new EndGate.TimeSpan(0,0,4);
        QUnit.equal(timeSpan1.Minutes, 4);
        timeSpan1.Minutes = 1;
        QUnit.equal(timeSpan1.Milliseconds, 60000);
        QUnit.equal(timeSpan1.Seconds, 60000 / 1000);
        QUnit.equal(timeSpan1.Minutes, (60000 / 1000) / 60);
    });

    QUnit.test("Add time to TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(0, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 2, 0);
        timeSpan1 = timeSpan1.Add(1);
        QUnit.equal(timeSpan1.Milliseconds, 1);
        timeSpan1 = timeSpan1.Add(timeSpan2);
        QUnit.equal(timeSpan1.Milliseconds, 2001);
    });

    QUnit.test("Multiply time in TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(5, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 1, 0);
        timeSpan1 = timeSpan1.Multiply(3);
        QUnit.equal(timeSpan1.Milliseconds, 15);
        timeSpan1 = timeSpan1.Multiply(timeSpan2);
        QUnit.equal(timeSpan1.Milliseconds, 15*1000);
    });

    QUnit.test("Subtract time from TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(2000, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 1, 0);
        timeSpan1 = timeSpan1.Subtract(10);
        QUnit.equal(timeSpan1.Milliseconds, 1990);
        timeSpan1 = timeSpan1.Subtract(timeSpan2);
        QUnit.equal(timeSpan1.Milliseconds, 990);
    });

    QUnit.test("Subtract time from another TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(10, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 1, 0);
        timeSpan1 = timeSpan1.SubtractFrom(1000);
        QUnit.equal(timeSpan1.Milliseconds, 990);
        timeSpan1 = timeSpan1.SubtractFrom(timeSpan2);
        QUnit.equal(timeSpan1.Milliseconds, 10);
    });

    QUnit.test("Divide the time by another TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(2000, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 1, 0);
        timeSpan1 = timeSpan1.Divide(2);
        QUnit.equal(timeSpan1.Milliseconds, 1000);
        timeSpan1 = timeSpan1.Divide(timeSpan2);
        QUnit.equal(timeSpan1.Milliseconds, 1);
    });

    QUnit.test("Divide the time from another TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(2, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 1, 0);
        timeSpan1 = timeSpan1.DivideFrom(2000);
        QUnit.equal(timeSpan1.Milliseconds, 1000);
        timeSpan1 = timeSpan1.DivideFrom(timeSpan2);
        QUnit.equal(timeSpan1.Milliseconds, 1);
    });

    QUnit.test("Verify two TimeSpans are equivalent", function () {
        var timeSpan1 = new EndGate.TimeSpan(2000, 0, 0);
        var timeSpan2 = new EndGate.TimeSpan(0, 2, 0);
        QUnit.ok(timeSpan1.Equivalent(timeSpan2));
    });

    QUnit.test("Can clone a TimeSpan", function () {
        var timeSpan1 = new EndGate.TimeSpan(1, 2, 3);
        QUnit.ok(timeSpan1.Equivalent(timeSpan1.Clone()));
    });

    QUnit.test("FromMilliseconds creates a TimeSpan", function () {
        var timeSpan1 = EndGate.TimeSpan.FromMilliseconds(15);
        QUnit.equal(timeSpan1.Milliseconds, 15);
    });

    QUnit.test("FromSeconds creates a TimeSpan", function () {
        var timeSpan1 = EndGate.TimeSpan.FromSeconds(15);
        QUnit.equal(timeSpan1.Seconds, 15);
    });

    QUnit.test("FromMinutes creates a TimeSpan", function () {
        var timeSpan1 = EndGate.TimeSpan.FromMinutes(15);
        QUnit.equal(timeSpan1.Minutes, 15);
    });

    QUnit.test("DateSpan creates a TimeSpan", function () {
        var timeSpan1 = EndGate.TimeSpan.DateSpan(new Date(10), new Date(20));
        QUnit.equal(timeSpan1.Milliseconds, 10);
    });

    QUnit.test("DateSpan creates a zero TimeSpan", function () {
        var timeSpan1 = EndGate.TimeSpan.Zero;
        QUnit.equal(timeSpan1.Milliseconds, 0);
    });

})();