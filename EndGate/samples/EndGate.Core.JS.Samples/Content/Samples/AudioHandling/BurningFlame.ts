/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    export class BurningFlame implements eg.IUpdateable extends Animation {
        constructor(x: number, y: number) {
            super("/Content/Samples/AudioHandling/images/burning_flame.png", x, y, 768, 128, 128, 128, 16, 6, () => { });
        }
    }

}