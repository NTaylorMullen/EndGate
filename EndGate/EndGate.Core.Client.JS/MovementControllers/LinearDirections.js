var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        (function (Assets) {
            var LinearDirections = (function () {
                function LinearDirections() {
                    this.Left = false;
                    this.Right = false;
                    this.Up = false;
                    this.Down = false;
                }
                return LinearDirections;
            })();
            Assets.LinearDirections = LinearDirections;            
        })(MovementControllers.Assets || (MovementControllers.Assets = {}));
        var Assets = MovementControllers.Assets;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=LinearDirections.js.map
