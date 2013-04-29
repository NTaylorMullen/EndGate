var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (MovementControllers) {
            var LinearMovementController = (function (_super) {
                __extends(LinearMovementController, _super);
                function LinearMovementController(moveables, moveSpeed, rotateWithMovements) {
                    if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                    var _this = this;
                                _super.call(this, moveables);
                    this._moveSpeed = moveSpeed;
                    this._moving = new MovementControllers.LinearDirections();
                    this._rotationUpdater = new Core.Utilities.NoopTripInvoker(function () {
                        _this.UpdateRotation();
                    }, rotateWithMovements);
                }
                LinearMovementController.prototype.IsMovingInDirection = function (direction) {
                    return this._moving[direction] || false;
                };
                LinearMovementController.prototype.StartMoving = function (direction) {
                    this.Move(direction, true);
                };
                LinearMovementController.prototype.StopMoving = function (direction) {
                    this.Move(direction, false);
                };
                LinearMovementController.prototype.MoveSpeed = function (speed) {
                    if(typeof speed !== "undefined") {
                        this._moveSpeed = speed;
                        this.UpdateVelocity();
                    }
                    return this._moveSpeed;
                };
                LinearMovementController.prototype.Update = function (gameTime) {
                    if(!this._frozen) {
                        this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.ElapsedSecond));
                        _super.prototype.Update.call(this, gameTime);
                    }
                };
                LinearMovementController.prototype.Move = function (direction, startMoving) {
                    if(typeof this._moving[direction] !== "undefined") {
                        this._moving[direction] = startMoving;
                        this.UpdateVelocity();
                        this._rotationUpdater.Invoke();
                    } else {
                        throw new Error(direction + " is an unknown direction.");
                    }
                };
                LinearMovementController.prototype.UpdateVelocity = function () {
                    var velocity = Core.Assets.Vector2d.Zero();
                    if(this._moving.Up) {
                        velocity.Y -= this._moveSpeed;
                    }
                    if(this._moving.Down) {
                        velocity.Y += this._moveSpeed;
                    }
                    if(this._moving.Left) {
                        velocity.X -= this._moveSpeed;
                    }
                    if(this._moving.Right) {
                        velocity.X += this._moveSpeed;
                    }
                    this.Velocity = velocity;
                };
                LinearMovementController.prototype.UpdateRotation = function () {
                    if(!this.Velocity.IsZero()) {
                        this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
                    }
                };
                return LinearMovementController;
            })(MovementControllers.MovementController);
            MovementControllers.LinearMovementController = LinearMovementController;            
        })(Core.MovementControllers || (Core.MovementControllers = {}));
        var MovementControllers = Core.MovementControllers;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=LinearMovementController.js.map
