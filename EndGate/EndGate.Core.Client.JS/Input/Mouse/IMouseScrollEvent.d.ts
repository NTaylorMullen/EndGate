/// <reference path="../../Assets/Vectors/Vector2d.ts" />
/// <reference path="IMouseEvent.d.ts" />

module EndGate.Core.Input.Mouse {

    export interface IMouseScrollEvent extends IMouseEvent{
        Direction: Assets.Vector2d;
    }

}