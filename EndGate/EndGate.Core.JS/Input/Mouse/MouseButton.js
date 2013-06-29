var EndGate;
(function (EndGate) {
    (function (Input) {
        (function (_) {
            var MouseButton = (function () {
                function MouseButton() {
                }
                MouseButton.Left = "Left";
                MouseButton.Middle = "Middle";
                MouseButton.Right = "Right";
                return MouseButton;
            })();
            _.MouseButton = MouseButton;
        })(Input._ || (Input._ = {}));
        var _ = Input._;
    })(EndGate.Input || (EndGate.Input = {}));
    var Input = EndGate.Input;
})(EndGate || (EndGate = {}));
