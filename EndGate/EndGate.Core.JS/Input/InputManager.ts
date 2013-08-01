/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="Mouse/MouseHandler.ts" />
/// <reference path="Keyboard/KeyboardHandler.ts" />

module EndGate.Input {

    /**
    * Defines an all around Input handler which manages mouse and keyboard events.
    */
    export class InputManager implements IDisposable {
        /**
        * Used to bind functions to mouse related events.
        */
        public Mouse: MouseHandler;
        /**
        * Used to bind functions to keyboard related events.
        */
        public Keyboard: KeyboardHandler;

        private _disposed: boolean;

        /**
        * Creates a new instance of the InputManager object.
        * @param target The object through which mouse events will be monitored on.
        */
        constructor(target: HTMLElement) {
            this._disposed = false;
            this.Mouse = new MouseHandler(target);
            this.Keyboard = new KeyboardHandler();
        }

        /**
        * Disposes the MouseHandler and unbinds all bound events.
        */
        public Dispose(): void {
            if (!this._disposed) {
                this._disposed = true;

                this.Mouse.Dispose();
                this.Keyboard.Dispose();
            }
            else {
                throw new Error("MouseHandler cannot be disposed more than once");
            }
        }
    }

}