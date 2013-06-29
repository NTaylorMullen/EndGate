/// <reference path="../../Assets/TimeSpan.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines an ITweeningFunction interface that represents a function that can be used to translate Tween's.
    */
    export interface ITweeningFunction {
        (from: number, to: number, elapsed: TimeSpan, duration: TimeSpan): number;
    }

}