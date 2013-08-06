/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    export class BurningFlame extends Animation implements eg.IUpdateable {
        public static BaseGraphic: eg.Graphics.ImageSource;

        constructor(x: number, y: number) {
            super(BurningFlame.BaseGraphic.Clone(), x, y, 128, 128, 16, 6, () => { });
        }
    }

}