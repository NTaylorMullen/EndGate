(function () {

    QUnit.module("Matrix2x2 Facts");

    QUnit.test("Matrix2x2 adds correctly.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(!(m === m.Add(0)), "Adding 0 returns a new Matrix2x2");
        QUnit.ok(m.Equivalent(m.Add(0)), "Adding 0 returns an equivalent Matrix2x2");
        QUnit.ok(m.Add(EndGate.Matrix2x2.Identity()).Equivalent(new EndGate.Matrix2x2(2, 2, 3, 5)), "Matrix2x2 can be added to other Matrixes, resulting in a valid new Matrix2x2.");
        QUnit.ok(m.Add(m).Equivalent(new EndGate.Matrix2x2(2, 4, 6, 8)), "Adding the Matrix2x2 to itself doubles the Matrix2x2 value.");
        QUnit.ok(m.Add(.1).Equivalent(new EndGate.Matrix2x2(1.1, 2.1, 3.1, 4.1)), "Adding floating point numbers create equivalent Matrix2x2's.");
    });
    
    QUnit.test("Matrix2x2 subtracts correctly.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(!(m === m.Subtract(0)), "Subtracting 0 returns a new Matrix2x2");
        QUnit.ok(!(m.Multiply(-1) === m.SubtractFrom(0)), "SubtractFrom 0 returns a new Matrix2x2");
        QUnit.ok(m.Equivalent(m.Subtract(0)), "Subtracting 0 returns an equivalent Matrix2x2");
        QUnit.ok(m.Multiply(-1).Equivalent(m.SubtractFrom(0)), "SubtractFrom 0 returns the negated Matrix2x2");
        QUnit.ok(m.Subtract(m).Equivalent(EndGate.Matrix2x2.Zero()), "Subtracting the Matrix2x2 from itself results in a 0 Matrix2x2.");
        QUnit.ok(m.SubtractFrom(m).Equivalent(EndGate.Matrix2x2.Zero()), "SubtractFrom the same Matrix2x2 results in a 0 Matrix2x2.");
        QUnit.ok(m.Subtract(.1).Equivalent(new EndGate.Matrix2x2(.9, 1.9, 2.9, 3.9)), "Subtracting small floating point numbers create floating point Matrix2x2s.");
        QUnit.ok(m.SubtractFrom(.1).Equivalent(new EndGate.Matrix2x2(-.9, -1.9, -2.9, -3.9)), "SubtractFrom small floating point numbers create negative floating point Matrix2x2s.");
    });
    
    QUnit.test("Matrix2x2 multiplies correctly.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(!(EndGate.Matrix2x2.Zero() === m.Multiply(0)), "Multiplying 0 returns a new Matrix2x2");
        QUnit.ok(EndGate.Matrix2x2.Zero().Equivalent(m.Multiply(0)), "Multiplying by 0 returns the zero Matrix2x2");
        QUnit.ok(m.Multiply(m).Equivalent(new EndGate.Matrix2x2(7, 10, 15, 22)), "Multiplying the Matrix2x2 by itself squares the Matrix2x2 value.");
        QUnit.ok(m.Multiply(.5).Equivalent(new EndGate.Matrix2x2(.5, 1, 1.5, 2)), "Multiplying floating point numbers create valid Matrix2x2s.");
    });
    
    QUnit.test("Matrix2x2 divides correctly.", function () {
        var m = new EndGate.Matrix2x2(2, 4, 10, 20);

        QUnit.ok(!(m === m.Divide(1)), "Dividing 1 returns a new Matrix2x2");
        QUnit.ok(!(EndGate.Matrix2x2(.5, .25, .1, .05) === m.DivideFrom(1)), "DivideFrom 1 returns a new Matrix2x2");
        QUnit.ok(m.Equivalent(m.Divide(1)), "Dividing 1 returns the same Matrix2x2");
        QUnit.ok(new EndGate.Matrix2x2(.5, .25, .1, .05).Equivalent(m.DivideFrom(1)), "DivideFrom 1 returns the portion of the original Matrix2x2");
        QUnit.ok(m.Divide(m).Equivalent(new EndGate.Matrix2x2(1, 1, 1, 1)), "Divide the matrix by itself results in a 1 Matrix2x2.");
        QUnit.ok(m.DivideFrom(m).Equivalent(new EndGate.Matrix2x2(1, 1, 1, 1)), "DivideFrom the same Matrix2x2 results in a 1 Matrix2x2.");
        QUnit.ok(m.Divide(.1).Equivalent(new EndGate.Matrix2x2(20, 40, 100, 200)), "Divide by small floating point numbers create floating point Matrix2x2s.");
        QUnit.ok(m.DivideFrom(.1).Equivalent(new EndGate.Matrix2x2(.05, .025, .01, .005)), "DivideFrom small floating point numbers create same floating point Matrix2x2s as Divide.");
    });
    
    QUnit.test("Matrix2x2 Clone works.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);
        var m2 = m.Clone();

        m2.Values[0][0] = 3;

        QUnit.notEqual(m, m2, "After clone m and m2 are not the same");
        QUnit.ok(!m.Equivalent(m2), "m2 was changed so now m and m2 are no longer equivalent");
        QUnit.ok(m.Equivalent(new EndGate.Matrix2x2(1, 2, 3, 4)), "m is still equivalent to its original pre-clone value.");
    });
    
    QUnit.test("Matrix2x2 Trigger works.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4),
            total = 0,
            sum = function (val) {
                total += val;
            };

        m.Trigger(sum);

        QUnit.equal(total, 10);
    });
    
    QUnit.test("Matrix2x2 Apply works.", function () {
        var m = new EndGate.Matrix2x2(1.11, 2.22, 3.33, 4.44);

        m.Apply(Math.round);

        QUnit.ok(m.Equivalent(new EndGate.Matrix2x2(1, 2, 3, 4)));

        m.Apply(function (val) { return val + 1; });

        QUnit.ok(m.Equivalent(new EndGate.Matrix2x2(2, 3, 4, 5)));
    });

    QUnit.test("Matrix2x2 Transform works.", function () {
        var v = new EndGate.Vector2d(1, 2),
            m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(m.Transform(v).Equivalent(new EndGate.Vector2d(5, 11)));
    });

    QUnit.test("Matrix2x2 Determinant works.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(m.Determinant() === -2);
    });

    QUnit.test("Matrix2x2 Transpose works.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(m.Transpose().Equivalent(new EndGate.Matrix2x2(1, 3, 2, 4)));
    });

    QUnit.test("Matrix2x2 Inverse works.", function () {
        var m = new EndGate.Matrix2x2(1, 2, 3, 4);

        QUnit.ok(m.Inverse().Equivalent(new EndGate.Matrix2x2(-2, 1, 1.5, -.5)));
    });

})();