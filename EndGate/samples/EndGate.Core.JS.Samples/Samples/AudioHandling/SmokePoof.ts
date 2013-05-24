/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    export class SmokePoof implements eg.IUpdateable extends Animation {
        constructor(x: number, y: number, onComplete: Function) {
            super("images/smoke_poof.png", x, y, 1280, 128, 128, 128, 20, 10, onComplete, false, true);
        }
    }

}