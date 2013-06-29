/// <reference path="../Assets/Vectors/Vector2d.ts" />

declare module EndGate {

    /**
    * Represents an object that has a position and rotation.
    */
    export interface IMoveable {
        /**
        * Gets or sets the location of the moveable object.
        */
        Position: Vector2d;
        /**
        * Gets or sets the rotation of the moveable object.
        */
        Rotation: number;
    }

}