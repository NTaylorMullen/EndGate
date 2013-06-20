/// <reference path="Mouse/MouseHandler.ts" />
/// <reference path="Keyboard/KeyboardHandler.ts" />

module eg.Input {

    /**
    * Defines an all around Input handler which manages mouse and keyboard events.
    */
    export class InputManager {
        /**
        * Used to bind functions to mouse related events.
        */
        public Mouse: MouseHandler;
        /**
        * Used to bind functions to keyboard related events.
        */
        public Keyboard: KeyboardHandler;

        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        constructor(target: HTMLElement) {
            this.Mouse = new MouseHandler(target);
            this.Keyboard = new KeyboardHandler();
        }
    }

}