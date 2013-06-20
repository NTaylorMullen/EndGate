/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="IMouseEvent.ts" />

declare module eg.Input {

    /**
    * Represents a mouse scroll event being triggered on the Game area.
    */
    export interface IMouseScrollEvent extends IMouseEvent {
        /**
        * The scroll direction. The Vector2d will contain 1, -1, or 0 values depending on the mouse scroll.
        */
        Direction: Vector2d;
    }

}