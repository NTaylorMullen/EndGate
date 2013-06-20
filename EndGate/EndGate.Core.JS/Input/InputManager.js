var EndGate;
(function (EndGate) {
    /// <reference path="Mouse/MouseHandler.ts" />
    /// <reference path="Keyboard/KeyboardHandler.ts" />
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
                this.Mouse = new Input.MouseHandler(target);
                this.Keyboard = new Input.KeyboardHandler();
            }
            return InputManager;
        })();
        Input.InputManager = InputManager;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
