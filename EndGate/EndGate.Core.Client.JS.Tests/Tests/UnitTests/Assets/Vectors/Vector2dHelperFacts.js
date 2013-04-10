﻿(function (window, lib) {

    QUnit.module("Vector2d Helper Facts");

    QUnit.test("Get Min Max projections works", function () {
        var axis = new lib.Vector2d(8, 0);
        var vertices = [
            new lib.Vector2d(2, 0),  // TL
            new lib.Vector2d(5, 3),  // TR
            new lib.Vector2d(0, -2), // BL
            new lib.Vector2d(3, 5)   // BR
        ];

        var expectedMax = vertices[1].ProjectOnto(axis).Dot(axis);
        var expectedMin = vertices[2].ProjectOnto(axis).Dot(axis);

        var maxmin = lib.Vector2dHelpers.GetMinMaxProjections(axis, vertices);

        QUnit.ok(maxmin.Min == expectedMin);
        QUnit.ok(maxmin.Max == expectedMax);
    });

})(window, EndGate.Core.Assets);