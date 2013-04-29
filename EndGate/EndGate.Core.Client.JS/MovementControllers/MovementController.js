var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (MovementControllers) {
            var MovementController = (function () {
                function MovementController(moveables) {
                    this.Position = Core.Assets.Vector2d.Zero();
                    this.Velocity = Core.Assets.Vector2d.Zero();
                    this.Rotation = 0;
                    this._frozen = false;
                    this._moveables = moveables;
                }
                MovementController.prototype.Freeze = function () {
                    this._frozen = true;
                };
                MovementController.prototype.Thaw = function () {
                    this._frozen = false;
                };
                MovementController.prototype.IsMoving = function () {
                    return !this._frozen && !this.Velocity.IsZero();
                };
                MovementController.prototype.Update = function (gameTime) {
                    for(var i = 0; i < this._moveables.length; i++) {
                        this._moveables[i].Position = this.Position;
                        this._moveables[i].Rotation = this.Rotation;
                    }
                };
                return MovementController;
            })();
            MovementControllers.MovementController = MovementController;            
        })(Core.MovementControllers || (Core.MovementControllers = {}));
        var MovementControllers = Core.MovementControllers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=MovementController.js.map
