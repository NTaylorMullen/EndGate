/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../GameTime.ts" />
var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        /**
        * Abstract class that holds moveable objects and synchronizes positions across them.
        */
        var MovementController = (function () {
            /**
            * Should only ever be called by derived classes.
            * @param moveables Moveable objects to synchronize.
            */
            function MovementController(moveables) {
                this.Position = moveables.length > 0 ? moveables[0].Position : EndGate.Vector2d.Zero;
                this.Velocity = EndGate.Vector2d.Zero;
                this.Rotation = 0;
                this._frozen = false;

                this._moveables = moveables;
            }
            /**
            * Prevents the MovementController from updating object locations.
            */
            MovementController.prototype.Freeze = function () {
                this._frozen = true;
            };

            /**
            * Used to re-enable movement within the MovementController.
            */
            MovementController.prototype.Thaw = function () {
                this._frozen = false;
            };

            /**
            * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
            */
            MovementController.prototype.IsMoving = function () {
                return !this._frozen && !this.Velocity.IsZero();
            };

            /**
            * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
            * @param gameTime The current game time object.
            */
            MovementController.prototype.Update = function (gameTime) {
                for (var i = 0; i < this._moveables.length; i++) {
                    this._moveables[i].Position = this.Position;
                    this._moveables[i].Rotation = this.Rotation;
                }
            };
            return MovementController;
        })();
        MovementControllers.MovementController = MovementController;
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
