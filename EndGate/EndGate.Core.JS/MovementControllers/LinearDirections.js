var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        (function (Assets) {
            /**
            * Defines a direction management object that represents directional state.
            */
            var LinearDirections = (function () {
                /**
                * Creates a new instance of the LinearDirection object with all directions= indicators initially set to false.
                */
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
