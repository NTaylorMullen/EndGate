var eg;
(function (eg) {
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
    })(eg.Input || (eg.Input = {}));
    var Input = eg.Input;
})(eg || (eg = {}));
