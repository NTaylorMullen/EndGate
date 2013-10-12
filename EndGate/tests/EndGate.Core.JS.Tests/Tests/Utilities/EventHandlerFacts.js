(function (window) {

    QUnit.module("Event Handler Facts");

    QUnit.test("BindFor successfully unbinds itself after the designated trigger count.", function () {
        var es = [new eg.EventHandler(), new eg.EventHandler1(), new eg.EventHandler2(), new eg.EventHandler3()],
            e;

        for (var i = 0; i < es.length; i++) {
            e = es[i];

            e.BindFor(function () { }, 2);

            QUnit.isTrue(e.HasBindings());
            e.Trigger();
            QUnit.isTrue(e.HasBindings());
            e.Trigger();
            QUnit.isFalse(e.HasBindings());
        }
    });

    QUnit.test("Events can be bound and triggered.", function () {
        var e = new eg.EventHandler(),
            firstTriggered = false,
            secondTriggered = false,
            first = function () {
                firstTriggered = true;
            },
            second = function () {
                secondTriggered = true;
            };

        QUnit.ok(!e.HasBindings());

        e.Bind(first);
        e.Bind(second);
        e.Trigger();

        QUnit.ok(firstTriggered);
        QUnit.ok(secondTriggered);
        QUnit.ok(e.HasBindings());
    });

    QUnit.test("Events can be bound, triggered, and then unbound and not triggered.", function () {
        var e = new eg.EventHandler(),
            firstTriggered = false,
            secondTriggered = false,
            first = function () {
                firstTriggered = true;
            },
            second = function () {
                secondTriggered = true;
            };

        QUnit.ok(!e.HasBindings());

        e.Bind(first);
        e.Bind(second);
        e.Trigger();

        QUnit.ok(firstTriggered);
        QUnit.ok(secondTriggered);

        firstTriggered = false;
        secondTriggered = false;

        e.Unbind(first);       
        e.Trigger();

        QUnit.ok(!firstTriggered);
        QUnit.ok(secondTriggered);
        QUnit.ok(e.HasBindings());
    });

    QUnit.test("Events can be bound with args, triggered, and then unbound and not triggered.", function () {
        var e = new eg.EventHandler2(),
            resultA = 0,
            resultB = 1,
            add = function (a, b) {
                resultA += a + b;
            },
            multiply = function (a, b) {
                resultB *= a * b;
            };

        e.Bind(add);
        e.Bind(multiply);
        e.Trigger(2, 9);

        QUnit.equal(resultA, 11);
        QUnit.equal(resultB, 18);

        e.Unbind(add)        
        e.Trigger(4, 4);

        QUnit.equal(resultA, 11);
        QUnit.equal(resultB, 288);

        e.Unbind(multiply);
        QUnit.ok(!e.HasBindings());
    });

})(window);