/// <reference path="../Interfaces/IDisposable.ts" />
/// <reference path="Mouse/MouseHandler.ts" />
/// <reference path="Keyboard/KeyboardHandler.ts" />
var EndGate;
(function (EndGate) {
    (function (Input) {
        /**
        * Defines an all around Input handler which manages mouse and keyboard events.
        */
        var InputManager = (function () {
            /**
            * Creates a new instance of the InputManager object.
            * @param target The object through which mouse events will be monitored on.
            */
            function InputManager(target) {
                this._disposed = false;
                this.Mouse = new EndGate.Input.MouseHandler(target);
                this.Keyboard = new EndGate.Input.KeyboardHandler();
            }
            /**
            * Disposes the MouseHandler and unbinds all bound events.
            */
            InputManager.prototype.Dispose = function () {
                if (!this._disposed) {
                    this._disposed = true;

                    this.Mouse.Dispose();
                    this.Keyboard.Dispose();
                } else {
                    throw new Error("MouseHandler cannot be disposed more than once");
                }
            };
            return InputManager;
        })();
        Input.InputManager = InputManager;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
