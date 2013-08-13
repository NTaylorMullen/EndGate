/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="Collidable.ts" />

module EndGate.Collision {

    /**
    * Defines a data object that is used to describe a collision event.
    */
    export class CollisionData {
        /**
        * Who collided with you.
        */
        public With: Collidable;

        /**
        * Creates a new instance of the CollisionData object.
        * @param w Initial value of the With component of CollisionData.
        */
        constructor(w: Collidable) {
            this.With = w;
        }
    }

}