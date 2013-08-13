(function () {
    QUnit.module("Color Facts");
    //Add tests for 
    //1. 6 digit hex
    //2. alpha hex
    //3. string colors
    QUnit.test("Passing a short #hex test", function () {
        var color = new eg.Graphics.Color("#fff");
        QUnit.ok(1 === color.A);
        QUnit.ok(255 === color.R);
        QUnit.ok(255 === color.G);
        QUnit.ok(255 === color.B);
    });

    QUnit.test("Passing a short hex test with an alpha channel", function () {
        var color = new eg.Graphics.Color("#f0f0");
        QUnit.ok(1 === color.A);
        QUnit.ok(0 === color.R);
        QUnit.ok(255 === color.G);
        QUnit.ok(0 === color.B);
    });

    QUnit.test("Passing a normal hex test", function () {
        var color = new eg.Graphics.Color("#11ccff");
        QUnit.ok(1 === color.A);
        QUnit.ok(17 === color.R);
        QUnit.ok(204 === color.G);
        QUnit.ok(255 === color.B);
    });

    QUnit.test("Passing a normal hex test with an alpha channel", function () {
        var color = new eg.Graphics.Color("#11ccff00");
        QUnit.ok(0 === color.A);
        QUnit.ok(17 === color.R);
        QUnit.ok(204 === color.G);
        QUnit.ok(255 === color.B);
    });

    QUnit.test("Passing a named color", function () {
        var color = new eg.Graphics.Color("aliceblue");
        QUnit.ok(1 === color.A);
        QUnit.ok(240 === color.R);
        QUnit.ok(248 === color.G);
        QUnit.ok(255 === color.B);
    });

    QUnit.test("Parsing rgb function style declaration", function () {
        var color = new eg.Graphics.Color("rgb(5, 4, 3)");
        QUnit.ok(1 === color.A);
        QUnit.ok(5 === color.R);
        QUnit.ok(4 === color.G);
        QUnit.ok(3 === color.B);
    });
    QUnit.test("Parsing argb function style declaration", function () {
        var color = new eg.Graphics.Color("argb(.5, 2, 3, 1)");
        QUnit.ok(.5 === color.A);
        QUnit.ok(2 === color.R);
        QUnit.ok(3 === color.G);
        QUnit.ok(1 === color.B);
    });
    QUnit.test("Parsing rgba function style declaration", function () {
        var color = new eg.Graphics.Color("rgba(1, 2, 3, .5)");
        console.log(color.A);
        QUnit.ok(.5 === color.A);
        QUnit.ok(1 === color.R);
        QUnit.ok(2 === color.G);
        QUnit.ok(3 === color.B);
    });
})();