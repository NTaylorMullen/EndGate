var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (MovementControllers) {
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController(moveables, moveSpeed, rotateWithMovements, multiDirectional) {
                if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                if (typeof multiDirectional === "undefined") { multiDirectional = true; }
                var _this = this;
                        _super.call(this, moveables);
                this._moveSpeed = moveSpeed;
                this._moving = new MovementControllers.Assets.LinearDirections();
                this.OnMove = new EndGate.EventHandler();
                this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(function () {
                    _this.UpdateRotation();
                }, rotateWithMovements);
                if(multiDirectional) {
                    this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
                } else {
                    this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
                }
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
                    this._velocityUpdater();
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
                    this._velocityUpdater();
                    this._rotationUpdater.Invoke();
                    this.OnMove.Trigger({
                        Direction: direction,
                        StartMoving: startMoving
                    });
                } else {
                    throw new Error(direction + " is an unknown direction.");
                }
            };
            LinearMovementController.prototype.UpdateVelocityNoMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero();
                if(velocity.IsZero()) {
                    if(this._moving.Up) {
                        velocity.Y -= this._moveSpeed;
                    }
                    if(this._moving.Down) {
                        velocity.Y += this._moveSpeed;
                    }
                    if(velocity.Y === 0) {
                        if(this._moving.Left) {
                            velocity.X -= this._moveSpeed;
                        }
                        if(this._moving.Right) {
                            velocity.X += this._moveSpeed;
                        }
                    }
                }
                this.Velocity = velocity;
            };
            LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
                var velocity = EndGate.Vector2d.Zero();
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
        })(MovementControllers.Abstractions.MovementController);
        MovementControllers.LinearMovementController = LinearMovementController;        
    })(EndGate.MovementControllers || (EndGate.MovementControllers = {}));
    var MovementControllers = EndGate.MovementControllers;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=LinearMovementController.js.map
