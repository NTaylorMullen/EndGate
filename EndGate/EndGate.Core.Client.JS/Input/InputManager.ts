/// <reference path="Mouse/MouseHandler.ts" />

module EndGate.Core.Input {

    export class InputManager {
        public Mouse: Mouse.MouseHandler;

        constructor(canvas: HTMLCanvasElement) {
            this.Mouse = new Mouse.MouseHandler(canvas);
        }
    }

}