var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        (function (_) {
            var LinearDirections = (function () {
                function LinearDirections() {
                    this.Left = false;
                    this.Right = false;
                    this.Up = false;
                    this.Down = false;
                }
                return LinearDirections;
            })();
            _.LinearDirections = LinearDirections;            
        })(MovementControllers._ || (MovementControllers._ = {}));
        var _ = MovementControllers._;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=LinearDirections.js.map
