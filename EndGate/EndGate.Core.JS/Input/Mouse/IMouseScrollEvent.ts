/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="IMouseEvent.ts" />

declare module EndGate.Input {

    export interface IMouseScrollEvent extends IMouseEvent {
        Direction: Vector2d;
    }

}