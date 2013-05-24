var EndGate;
(function (EndGate) {
    (function (Input) {
        var InputManager = (function () {
            function InputManager(canvas) {
                this.Mouse = new Input.MouseHandler(canvas);
                this.Keyboard = new Input.KeyboardHandler();
            }
            return InputManager;
        })();
        Input.InputManager = InputManager;        
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=InputManager.js.map
