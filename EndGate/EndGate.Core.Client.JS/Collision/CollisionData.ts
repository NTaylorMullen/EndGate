/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Collidable.ts" />

module EndGate.Core.Collision {

    import Assets = module(EndGate.Core.Assets);

    export class CollisionData {
        public At: Assets.Vector2d;
        public With: Collidable;

        constructor(at: Assets.Vector2d, w: Collidable) {
            this.At = at;
            this.With = w;
        }
    }

}