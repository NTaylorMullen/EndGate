var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        /// <reference path="../Assets/Vectors/Vector2d.ts" />
        /// <reference path="../Interfaces/IMoveable.ts" />
        /// <reference path="../Interfaces/IUpdateable.ts" />
        /// <reference path="../GameTime.ts" />
        (function (Abstractions) {
            var MovementController = (function () {
                function MovementController(moveables) {
                    this.Position = EndGate.Vector2d.Zero();
                    this.Velocity = EndGate.Vector2d.Zero();
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
                    // Sync moveables position and rotation
                    for(var i = 0; i < this._moveables.length; i++) {
                        this._moveables[i].Position = this.Position;
                        this._moveables[i].Rotation = this.Rotation;
                    }
                };
                return MovementController;
            })();
            Abstractions.MovementController = MovementController;            
        })(MovementControllers.Abstractions || (MovementControllers.Abstractions = {}));
        var Abstractions = MovementControllers.Abstractions;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=MovementController.js.map
