/// <reference path="Mouse/MouseHandler.ts" />
/// <reference path="Keyboard/KeyboardHandler.ts" />

module EndGate.Input {

    export class InputManager {
        public Mouse: MouseHandler;
        public Keyboard: KeyboardHandler;

        constructor(canvas: HTMLCanvasElement) {
            this.Mouse = new MouseHandler(canvas);
            this.Keyboard = new KeyboardHandler();
        }
    }

}