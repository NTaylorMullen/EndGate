var EndGate;
(function (EndGate) {
    /// <reference path="../Vector2d.ts" />
    /// <reference path="MinMax.ts" />
    (function (_) {
        var Vector2dHelpers = (function () {
            function Vector2dHelpers() { }
            Vector2dHelpers.GetMinMaxProjections = function GetMinMaxProjections(axis, vertices) {
                var min = vertices[0].ProjectOnto(axis).Dot(axis);
                var max = min;
                for(var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];
                    var value = vertex.ProjectOnto(axis).Dot(axis);
                    if(value < min) {
                        min = value;
                    } else if(value > max) {
                        max = value;
                    }
                }
                return new _.MinMax(min, max);
            };
            return Vector2dHelpers;
        })();
        _.Vector2dHelpers = Vector2dHelpers;        
    })(EndGate._ || (EndGate._ = {}));
    var _ = EndGate._;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Vector2dHelpers.js.map
