var EndGate;
(function (EndGate) {
    (function (Collision) {
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference path="Collidable.ts" />
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
