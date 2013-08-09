/// <reference path="../../Assets/TimeSpan.ts" />

module EndGate.Tweening.Functions {

    /**
    * Defines an ITweeningFunction interface that represents a function that can be used to translate Tween's.
    */
    export interface ITweeningFunction {
        (from: Number, to: Number, elapsed: TimeSpan, duration: TimeSpan): number;
    }

}