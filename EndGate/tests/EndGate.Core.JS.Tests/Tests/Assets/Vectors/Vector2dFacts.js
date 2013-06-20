(function() {

    QUnit.module("Vector2d Facts");

    QUnit.test("Vector2d adds correctly.", function () {
        var v = new eg.Vector2d(2, 3);

        QUnit.ok(!(v === v.Add(0)),"Adding 0 returns a new vector2d");
        QUnit.ok(v.Equivalent(v.Add(0)), "Adding 0 returns an equivalent vector2d");
        QUnit.ok(v.Add(v).Equivalent(new eg.Vector2d(4, 6)), "Adding the vector to itself doubles the vector2d value.");
        QUnit.ok(v.Add(.1).Equivalent(new eg.Vector2d(2.1, 3.1)), "Adding floating point numbers create equivalent vector2ds.");
    });

    QUnit.test("Vector2d subtracts correctly.", function () {
        var v = new eg.Vector2d(2, 3);

        QUnit.ok(!(v === v.Subtract(0)), "Subtracting 0 returns a new vector2d");
        QUnit.ok(!(v.Negate() === v.SubtractFrom(0)), "SubtractFrom 0 returns a new vector2d");
        QUnit.ok(v.Equivalent(v.Subtract(0)), "Subtracting 0 returns an equivalent vector2d");
        QUnit.ok(v.Negate().Equivalent(v.SubtractFrom(0)), "SubtractFrom 0 returns the negated vector2d");
        QUnit.ok(v.Subtract(v).Equivalent(eg.Vector2d.Zero()), "Subtracting the vector from itself results in a 0 vector2d.");
        QUnit.ok(v.SubtractFrom(v).Equivalent(eg.Vector2d.Zero()), "SubtractFrom the same vector2d results in a 0 vector2d.");
        QUnit.ok(v.Subtract(.1).Equivalent(new eg.Vector2d(1.9, 2.9)), "Subtracting small floating point numbers create floating point vector2ds.");
        QUnit.ok(v.SubtractFrom(.1).Equivalent(new eg.Vector2d(-1.9, -2.9)), "SubtractFrom small floating point numbers create negative floating point vector2ds.");
    });

    QUnit.test("Vector2d multiplies correctly.", function () {
        var v = new eg.Vector2d(2, 3);

        QUnit.ok(!(eg.Vector2d.Zero() === v.Multiply(0)), "Multiplying 0 returns a new vector2d");
        QUnit.ok(eg.Vector2d.Zero().Equivalent(v.Multiply(0)), "Multiplying by 0 returns the zero vector2d");
        QUnit.ok(v.Multiply(v).Equivalent(new eg.Vector2d(4, 9)), "Multiplying the vector by itself squares the vector2d value.");
        QUnit.ok(v.Multiply(.5).Equivalent(new eg.Vector2d(1, 1.5)), "Multiplying floating point numbers create valid vector2ds.");
    });

    QUnit.test("Vector2d divides correctly.", function () {
        var v = new eg.Vector2d(2, 4);

        QUnit.ok(!(v === v.Divide(1)), "Dividing 1 returns a new vector2d");
        QUnit.ok(!(eg.Vector2d(.5, .25) === v.DivideFrom(1)), "DivideFrom 1 returns a new vector2d");
        QUnit.ok(v.Equivalent(v.Divide(1)), "Dividing 1 returns the same vector2d");
        QUnit.ok(new eg.Vector2d(.5, .25).Equivalent(v.DivideFrom(1)), "DivideFrom 1 returns the portion of the original vector2d");
        QUnit.ok(v.Divide(v).Equivalent(eg.Vector2d.One()), "Divide the vector by itself results in a 1 vector2d.");
        QUnit.ok(v.DivideFrom(v).Equivalent(eg.Vector2d.One()), "DivideFrom the same vector2d results in a 1 vector2d.");
        QUnit.ok(v.Divide(.1).Equivalent(new eg.Vector2d(20, 40)), "Divide by small floating point numbers create floating point vector2ds.");
        QUnit.ok(v.DivideFrom(.1).Equivalent(new eg.Vector2d(.05, .025)), "DivideFrom small floating point numbers create same floating point vector2ds as Divide.");
    });

    QUnit.test("Vector2d Distance works.", function () {
        var v1 = new eg.Vector2d(1, 1);
        var v2 = new eg.Vector2d(13, 8);

        QUnit.ok(v1.Distance(v2).Equivalent(new eg.Vector2d(12, 7)));
    });

    QUnit.test("Vector2d Sign works.", function () {
        var v = new eg.Vector2d(3, -4);

        QUnit.ok(v.Sign().Equivalent(new eg.Vector2d(1, -1)));
    });

    QUnit.test("Vector2d Abs works.", function () {
        var v = new eg.Vector2d(3, -4);

        QUnit.ok(v.Abs().Equivalent(new eg.Vector2d(3, 4)));
    });

    QUnit.test("Vector2d Dot Product works.", function () {
        var v = new eg.Vector2d(3, 4);
        var v2 = new eg.Vector2d(8, 7);

        QUnit.equal(v.Dot(v2), 52);
    });

    QUnit.test("Vector2d Magnitude works.", function () {
        var v = new eg.Vector2d(2, 2);
        var mag = v.Magnitude();

        QUnit.equal(2.83, Math.roundTo(mag, 2));
    });

    QUnit.test("Vector2d Length works.", function () {
        var v = new eg.Vector2d(2, 2);
        var length = v.Length();

        QUnit.equal(2.83, Math.roundTo(length, 2));
    });

    QUnit.test("Vector2d Normalized works.", function () {
        var v = new eg.Vector2d(12, 23);
        var v2 = v.Normalized();

        QUnit.notEqual(v, v2, "Normalized returns a new Vector2d");
        QUnit.ok(v.Equivalent(new eg.Vector2d(12, 23)), "V normalized is calculated correctly");
        QUnit.equal(1, v.Normalized().Magnitude(), "Normalized magnitude is 1");
    });

    QUnit.test("Vector2d Clone works.", function () {
        var v = new eg.Vector2d(1, 2);
        var v2 = v.Clone();

        v2.X = 3;

        QUnit.notEqual(v, v2, "After clone v and v2 are not the same");
        QUnit.ok(!v.Equivalent(v2), "v2 was changed so now v and v2 are no longer equivalent");
        QUnit.ok(v.Equivalent(new eg.Vector2d(1, 2)), "v is still equivalent to its original pre-clone value.");
    });

    QUnit.test("Vector2d Trigger works.", function () {
        var v = new eg.Vector2d(2, 3);
        var total = 0;
        var sum = function(val) {
            total += val;
        };

        v.Trigger(sum);

        QUnit.equal(5, total);
    });

    QUnit.test("Vector2d Apply works.", function () {
        var v = new eg.Vector2d(1.11, 2.22);

        v.Apply(Math.round);

        QUnit.ok(v.Equivalent(new eg.Vector2d(1, 2)));

        v.Apply(function(val) { return val + 1; });

        QUnit.ok(v.Equivalent(new eg.Vector2d(2, 3)));
    });

    QUnit.test("Vector2d Rotate Around works.", function () {
        var v1 = eg.Vector2d.Zero();

        // Flip
        var rotated = v1.RotateAround(eg.Vector2d.One(), Math.PI);

        QUnit.notEqual(v1, rotated, "v1 reference does not have same reference as rotated.");
        QUnit.ok(!v1.Equivalent(rotated), "v1 is not equivalent to the rotated value.");
        QUnit.ok(rotated.Equivalent(new eg.Vector2d(2, 2)), "RotateAround rotates correctly.");
    });
    
    QUnit.test("Vector2d Project Onto works.", function () {
        var v = new eg.Vector2d(3, 7);
        var axis = new eg.Vector2d(8, 0);

        var projection = v.ProjectOnto(axis);

        QUnit.ok(projection.Equivalent(new eg.Vector2d(3, 0)));
    });
    

})();