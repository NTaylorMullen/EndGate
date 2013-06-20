/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />

// Wrap in module to keep code out of global scope
module AnimatedSprites {

    export class FireExplosion extends Animation implements eg.IUpdateable {
        constructor(x: number, y: number, onComplete: Function) {
            super("/Content/Samples/AnimatedSprites/images/fire_explosion.png", x, y, 1152, 128, 128, 128, 18, 9, onComplete);
        }
    }

}