/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AnimatedSprites {

    export class ElectricPulse implements eg.IUpdateable extends Animation {
        constructor(x: number, y: number, onComplete: Function) {
            super("/Content/Samples/AnimatedSprites/images/electric_pulse.png", x, y, 1152, 128, 128, 128, 20, 10, onComplete);
        }
    }

}