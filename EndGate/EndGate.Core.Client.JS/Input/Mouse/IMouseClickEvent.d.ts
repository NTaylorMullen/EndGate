/// <reference path="IMouseEvent.d.ts" />
/// <reference path="MouseButton.ts" />

module EndGate.Core.Input.Mouse {

    export interface IMouseClickEvent extends IMouseEvent {
        Button: string;
    }

}