var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Assets) {
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
                    return new Assets.MinMax(min, max);
                };
                return Vector2dHelpers;
            })();
            Assets.Vector2dHelpers = Vector2dHelpers;            
        })(Core.Assets || (Core.Assets = {}));
        var Assets = Core.Assets;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
