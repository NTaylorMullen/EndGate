/// <reference path="../../Assets/Vectors/Vector2d.ts" />

declare module eg.Input {

    /**
    * Represents a mouse event being triggered on the Game area.
    */
    export interface IMouseEvent {
        /**
        * The location of the mouse relative to the game area.
        */
        Position: Vector2d;
    }

}