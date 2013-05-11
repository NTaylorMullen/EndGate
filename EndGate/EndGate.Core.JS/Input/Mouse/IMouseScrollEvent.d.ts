/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="IMouseEvent.d.ts" />

module EndGate.Input {

    export interface IMouseScrollEvent extends IMouseEvent{
        Direction: Vector2d;
    }

}