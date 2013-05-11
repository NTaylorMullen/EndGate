/// <reference path="IMouseEvent.d.ts" />
/// <reference path="MouseButton.ts" />

module EndGate.Input {

    export interface IMouseClickEvent extends IMouseEvent {
        Button: string;
    }

}