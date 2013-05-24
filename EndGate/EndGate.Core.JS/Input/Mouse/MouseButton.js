var EndGate;
(function (EndGate) {
    (function (Input) {
        var MouseButton = (function () {
            function MouseButton() { }
            MouseButton.Left = "Left";
            MouseButton.Middle = "Middle";
            MouseButton.Right = "Right";
            return MouseButton;
        })();
        Input.MouseButton = MouseButton;        
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
