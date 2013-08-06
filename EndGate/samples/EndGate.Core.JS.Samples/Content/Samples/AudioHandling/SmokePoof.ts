/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AudioHandling {

    export class SmokePoof extends Animation implements eg.IUpdateable {
        public static BaseGraphic: eg.Graphics.ImageSource;

        constructor(x: number, y: number, onComplete: Function) {
            super(SmokePoof.BaseGraphic.Clone(), x, y, 128, 128, 20, 10, onComplete, false, true);
        }
    }

}