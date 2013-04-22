/// <reference path="Mouse/MouseHandler.ts" />
/// <reference path="Keyboard/KeyboardHandler.ts" />

module EndGate.Core.Input {

    export class InputManager {
        public Mouse: Mouse.MouseHandler;
        public Keyboard: Keyboard.KeyboardHandler;

        constructor(canvas: HTMLCanvasElement) {
            this.Mouse = new Mouse.MouseHandler(canvas);
            this.Keyboard = new Keyboard.KeyboardHandler();
        }
    }

}