/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AnimatedSprites {

    export class ElectricPulse extends Animation implements eg.IUpdateable {
        public static BaseGraphic: eg.Graphics.ImageSource;

        constructor(x: number, y: number, onComplete: Function) {
            super(ElectricPulse.BaseGraphic.Clone(), x, y, 128, 128, 20, 10, onComplete);
        }
    }

}