var temp = true;

(function (window, lib) {

    QUnit.module("Bounding Circle Facts");

    QUnit.test("Area Works", function () {
        var obj = new lib.BoundingCircle(10);

        QUnit.equal(Math.round(obj.Area()), 314);
    });

    QUnit.test("Circumference Works", function () {
        var obj = new lib.BoundingCircle(10);

        QUnit.equal(Math.round(obj.Circumfrence()), 63);
    });
    
})(window, EndGate.Core.BoundingObject)