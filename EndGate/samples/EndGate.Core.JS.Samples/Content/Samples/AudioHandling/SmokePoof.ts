/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    export class SmokePoof extends Animation implements eg.IUpdateable {
        constructor(x: number, y: number, onComplete: Function) {
            super("/Content/Samples/AudioHandling/images/smoke_poof.png", x, y, 1280, 128, 128, 128, 20, 10, onComplete, false, true);
        }
    }

}