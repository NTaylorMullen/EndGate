/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="Animation.ts" />

class FireExplosion implements eg.IUpdateable extends Animation {
    constructor(x: number, y: number, onComplete: Function) {
        super("images/fire_explosion.png", x, y, 1152, 128, 128, 128, 18, 9, onComplete);
    }
}