/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="Animation.ts" />

class BurningFlame implements eg.IUpdateable extends Animation {
    constructor(x: number, y: number) {
        super("images/burning_flame.png", x, y, 768, 128, 128, 128, 16, 6, () => { });
    }
}