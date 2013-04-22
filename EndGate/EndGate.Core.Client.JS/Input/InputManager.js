var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            var InputManager = (function () {
                function InputManager(canvas) {
                    this.Mouse = new Input.Mouse.MouseHandler(canvas);
                    this.Keyboard = new Input.Keyboard.KeyboardHandler();
                }
                return InputManager;
            })();
            Input.InputManager = InputManager;            
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=InputManager.js.map
