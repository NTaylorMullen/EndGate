var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Collision) {
            var CollisionData = (function () {
                function CollisionData(at, w) {
                    this.At = at;
                    this.With = w;
                }
                return CollisionData;
            })();
            Collision.CollisionData = CollisionData;            
        })(Core.Collision || (Core.Collision = {}));
        var Collision = Core.Collision;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=CollisionData.js.map
