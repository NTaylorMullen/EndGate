var EndGate;
(function (EndGate) {
    (function (Collision) {
        (function (Assets) {
            var CollisionData = (function () {
                function CollisionData(at, w) {
                    this.At = at;
                    this.With = w;
                }
                return CollisionData;
            })();
            Assets.CollisionData = CollisionData;            
        })(Collision.Assets || (Collision.Assets = {}));
        var Assets = Collision.Assets;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=CollisionData.js.map
