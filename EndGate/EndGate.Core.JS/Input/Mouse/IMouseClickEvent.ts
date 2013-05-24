/// <reference path="IMouseEvent.ts" />
/// <reference path="MouseButton.ts" />

declare module EndGate.Input {

    export interface IMouseClickEvent extends IMouseEvent {
        Button: string;
    }

}