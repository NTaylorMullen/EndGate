var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="Collidable.ts" />
    (function (Collision) {
        /**
        * Defines a data object that is used to describe a collision event.
        */
        var CollisionData = (function () {
            /**
            * Creates a new instance of the CollisionData object.
            * @param w Initial value of the With component of CollisionData.
            */
            function CollisionData(w) {
                this.With = w;
            }
            return CollisionData;
        })();
        Collision.CollisionData = CollisionData;
    })(EndGate.Collision || (EndGate.Collision = {}));
    var Collision = EndGate.Collision;
})(EndGate || (EndGate = {}));
