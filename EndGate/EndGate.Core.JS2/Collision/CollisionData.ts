/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Collidable.ts" />

module EndGate.Collision.Assets {

    export class CollisionData {
        public At: Vector2d;
        public With: Collidable;

        constructor(at: Vector2d, w: Collidable) {
            this.At = at;
            this.With = w;
        }
    }

}