/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Collidable.ts" />

module EndGate.Collision.Assets {

    /**
    * Defines a data object that is used to describe a collision event.
    */
    export class CollisionData {
        /**
        * Where the collision occurred.
        */
        public At: Vector2d;

        /**
        * Who collided with you.
        */
        public With: Collidable;

        /**
        * Creates a new instance of the CollisionData object.
        * @param at Initial value of the At component of CollisionData.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(at: Vector2d, w: Collidable) {
            this.At = at;
            this.With = w;
        }
    }

}