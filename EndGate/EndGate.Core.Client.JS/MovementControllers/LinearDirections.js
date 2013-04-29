var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (MovementControllers) {
            var LinearDirections = (function () {
                function LinearDirections() {
                    this.Left = false;
                    this.Right = false;
                    this.Up = false;
                    this.Down = false;
                }
                return LinearDirections;
            })();
            MovementControllers.LinearDirections = LinearDirections;            
        })(Core.MovementControllers || (Core.MovementControllers = {}));
        var MovementControllers = Core.MovementControllers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=LinearDirections.js.map
