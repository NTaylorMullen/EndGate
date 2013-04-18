var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (Input) {
            (function (Mouse) {
                var MouseButton = (function () {
                    function MouseButton() { }
                    MouseButton.Left = "Left";
                    MouseButton.Middle = "Middle";
                    MouseButton.Right = "Right";
                    return MouseButton;
                })();
                Mouse.MouseButton = MouseButton;                
            })(Input.Mouse || (Input.Mouse = {}));
            var Mouse = Input.Mouse;
        })(Core.Input || (Core.Input = {}));
        var Input = Core.Input;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=MouseButton.js.map
