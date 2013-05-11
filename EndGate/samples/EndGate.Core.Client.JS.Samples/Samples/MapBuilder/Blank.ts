/// <reference path="../../Scripts/endGate.core.client.ts" />

class Blank extends eg.Graphics.Rectangle {

    constructor(x: number, y: number, width: number, height: number) {
        super(x, y, width, height);
    }

    // Disables unnecessary drawing
    public Draw(context: CanvasRenderingContext2D): void {
    }
}