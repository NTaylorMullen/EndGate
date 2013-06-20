/// <reference path="IMouseEvent.ts" />
/// <reference path="MouseButton.ts" />

declare module eg.Input {

    /**
    * Represents a mouse click event being triggered on the Game area.
    */
    export interface IMouseClickEvent extends IMouseEvent {
        /**
        * The mouse button that was clicked. Values can be "Left", "Right", or "Middle".
        */
        Button: string;
    }

}