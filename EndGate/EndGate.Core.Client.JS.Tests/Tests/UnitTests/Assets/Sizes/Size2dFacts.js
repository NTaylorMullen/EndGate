(function (window, lib) {

    QUnit.module("Size2d Facts");

    QUnit.test("Size2d adds correctly.", function () {
        var s = new lib.Size2d(2, 3);

        QUnit.ok(!(s === s.Add(0)), "Adding 0 returns a new size2d");
        QUnit.ok(s.Equivalent(s.Add(0)), "Adding 0 returns an equivalent size2d");
        QUnit.ok(s.Add(lib.Vector2d.One()).Equivalent(new lib.Size2d(3, 4)), "Size2d can be added to vectors, resulting in a valid new Size2d.");
        QUnit.ok(s.Add(s).Equivalent(new lib.Size2d(4, 6)), "Adding the vector to itself doubles the size2d value.");
        QUnit.ok(s.Add(.1).Equivalent(new lib.Size2d(2.1, 3.1)), "Adding floating point numbers create equivalent size2ds.");
    });

    QUnit.test("Size2d subtracts correctly.", function () {
        var s = new lib.Size2d(2, 3);

        QUnit.ok(!(s === s.Subtract(0)), "Subtracting 0 returns a new size2d");
        QUnit.ok(!(s.Negate() === s.SubtractFrom(0)), "SubtractFrom 0 returns a new size2d");
        QUnit.ok(s.Equivalent(s.Subtract(0)), "Subtracting 0 returns an equivalent size2d");
        QUnit.ok(s.Negate().Equivalent(s.SubtractFrom(0)), "SubtractFrom 0 returns the negated size2d");
        QUnit.ok(s.Subtract(s).Equivalent(lib.Size2d.Zero()), "Subtracting the vector from itself results in a 0 size2d.");
        QUnit.ok(s.SubtractFrom(s).Equivalent(lib.Size2d.Zero()), "SubtractFrom the same size2d results in a 0 size2d.");
        QUnit.ok(s.Subtract(lib.Vector2d.One()).Equivalent(new lib.Size2d(1, 2)), "Size2d can be subtracted to vectors, resulting in a valid new Size2d.");
        QUnit.ok(s.SubtractFrom(lib.Vector2d.One()).Equivalent(new lib.Size2d(-1, -2)), "Size2d can be subtracted from vectors, resulting in a valid new Size2d.");
        QUnit.ok(s.Subtract(.1).Equivalent(new lib.Size2d(1.9, 2.9)), "Subtracting small floating point numbers create floating point size2ds.");
        QUnit.ok(s.SubtractFrom(.1).Equivalent(new lib.Size2d(-1.9, -2.9)), "SubtractFrom small floating point numbers create negative floating point size2ds.");
    });

    QUnit.test("Size2d multiplies correctly.", function () {
        var s = new lib.Size2d(2, 3);

        QUnit.ok(!(lib.Size2d.Zero() === s.Multiply(0)), "Multiplying 0 returns a new size2d");
        QUnit.ok(lib.Size2d.Zero().Equivalent(s.Multiply(0)), "Multiplying by 0 returns the zero size2d");
        QUnit.ok(s.Multiply(s).Equivalent(new lib.Size2d(4, 9)), "Multiplying the vector by itself squares the size2d value.");
        QUnit.ok(s.Multiply(lib.Vector2d.One()).Equivalent(new lib.Size2d(2, 3)), "Size2d can be multiplied by vectors, resulting in a valid new Size2d.");
        QUnit.ok(s.Multiply(.5).Equivalent(new lib.Size2d(1, 1.5)), "Multiplying floating point numbers create valid size2ds.");
    });

    QUnit.test("Size2d divides correctly.", function () {
        var s = new lib.Size2d(2, 4);

        QUnit.ok(!(s === s.Divide(1)), "Dividing 1 returns a new size2d");
        QUnit.ok(!(lib.Size2d(.5, .25) === s.DivideFrom(1)), "DivideFrom 1 returns a new size2d");
        QUnit.ok(s.Equivalent(s.Divide(1)), "Dividing 1 returns the same size2d");
        QUnit.ok(new lib.Size2d(.5, .25).Equivalent(s.DivideFrom(1)), "DivideFrom 1 returns the portion of the original size2d");
        QUnit.ok(s.Divide(s).Equivalent(lib.Size2d.One()), "Divide the vector by itself results in a 1 size2d.");
        QUnit.ok(s.DivideFrom(s).Equivalent(lib.Size2d.One()), "DivideFrom the same size2d results in a 1 size2d.");
        QUnit.ok(s.Divide(lib.Vector2d.One()).Equivalent(new lib.Size2d(2, 4)), "Size2d can be divided by vectors, resulting in a valid new Size2d.");
        QUnit.ok(s.DivideFrom(lib.Vector2d.One()).Equivalent(new lib.Size2d(.5, .25)), "Size2d can be divided by vectors, resulting in a valid new Size2d.");
        QUnit.ok(s.Divide(.1).Equivalent(new lib.Size2d(20, 40)), "Divide by small floating point numbers create floating point size2ds.");
        QUnit.ok(s.DivideFrom(.1).Equivalent(new lib.Size2d(.05, .025)), "DivideFrom small floating point numbers create same floating point size2ds as Divide.");
    });

    QUnit.test("Size2d Clone works.", function () {
        var s = new lib.Size2d(1, 2);
        var s2 = s.Clone();

        s2.Width = 3;

        QUnit.notEqual(s, s2, "After clone s and s2 are not the same");
        QUnit.ok(!s.Equivalent(s2), "s2 was changed so now s and s2 are no longer equivalent");
        QUnit.ok(s.Equivalent(new lib.Size2d(1, 2)), "s is still equivalent to its original pre-clone value.");
    });

    QUnit.test("Size2d Trigger works.", function () {
        var s = new lib.Size2d(2, 3);
        var total = 0;
        var sum = function (val) {
            total += val;
        };

        s.Trigger(sum);

        QUnit.equal(5, total);
    });

    QUnit.test("Size2d Apply works.", function () {
        var s = new lib.Size2d(1.11, 2.22);

        s.Apply(Math.round);

        QUnit.ok(s.Equivalent(new lib.Size2d(1, 2)));

        s.Apply(function (val) { return val + 1; });

        QUnit.ok(s.Equivalent(new lib.Size2d(2, 3)));
    });


})(window, EndGate.Core.Assets);