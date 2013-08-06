/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AnimatedSprites {

    export class FireExplosion extends Animation implements eg.IUpdateable {
        public static BaseGraphic: eg.Graphics.ImageSource;

        constructor(x: number, y: number, onComplete: Function) {
            var graphic = FireExplosion.BaseGraphic.Clone();

            super(graphic, x, y, 128, 128, 18, 9, onComplete);
        }
    }

}