var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Interfaces/IMoveable.ts" />
    /// <reference path="../Utilities/NoopTripInvoker.ts" />
    /// <reference path="../Extensions/MathExtensions.ts" />
    /// <reference path="../GameTime.ts" />
    /// <reference path="../Utilities/EventHandler.ts" />
    /// <reference path="LinearDirections.ts" />
    /// <reference path="IMoveEvent.ts" />
    /// <reference path="MovementController.ts" />
    (function (MovementControllers) {
        /**
        * Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
        */
        var LinearMovementController = (function (_super) {
            __extends(LinearMovementController, _super);
            function LinearMovementController(moveables, moveSpeed, rotateWithMovements, multiDirectional) {
                if (typeof rotateWithMovements === "undefined") { rotateWithMovements = true; }
                if (typeof multiDirectional === "undefined") { multiDirectional = true; }
                var _this = this;
                _super.call(this, moveables);

                this._moveSpeed = moveSpeed;
                this._moving = new MovementControllers.Assets.LinearDirections();
                this.OnMove = new eg.EventHandler();
                this._rotationUpdater = new eg._.Utilities.NoopTripInvoker(function () {
                    _this.UpdateRotation();
                }, rotateWithMovements);

                if (multiDirectional) {
                    this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
                } else {
                    this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
                }
            }
            /**
            * Determines if the movement controller is moving in the provided direction.
            * @param direction The direction to check.
            */
            LinearMovementController.prototype.IsMovingInDirection = function (direction) {
                return this._moving[direction] || false;
            };

            /**
            * Starts moving the movement controller in the specified direction.
            * @param direction The direction to start moving.
            */
            LinearMovementController.prototype.StartMoving = function (direction) {
                this.Move(direction, true);
            };

            /**
            * Stops the movement controller from moving in the specified direction.
            * @param direction The direction to stop moving.
            */
            LinearMovementController.prototype.StopMoving = function (direction) {
                this.Move(direction, false);
            };

            LinearMovementController.prototype.MoveSpeed = function (speed) {
                if (typeof speed !== "undefined") {
                    this._moveSpeed = speed;
                    this._velocityUpdater();
                }

                return this._moveSpeed;
            };

            /**
            * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
            * @param gameTime The current game time object.
            */
            LinearMovementController.prototype.Update = function (gameTime) {
                if (!this._frozen) {
                    this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.ElapsedSecond));

                    _super.prototype.Update.call(this, gameTime);
                }
            };

            /**
            * Triggers a move event on the MovementController.
            * @param direction The direction to start or stop moving.
            * @param startMoving Whether the movement is starting or stopping.
            */
            LinearMovementController.prototype.Move = function (direction, startMoving) {
                if (typeof this._moving[direction] !== "undefined") {
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
                var velocity = eg.Vector2d.Zero();

                if (velocity.IsZero()) {
                    if (this._moving.Up) {
                        velocity.Y -= this._moveSpeed;
                    }
                    if (this._moving.Down) {
                        velocity.Y += this._moveSpeed;
                    }

                    if (velocity.Y === 0) {
                        if (this._moving.Left) {
                            velocity.X -= this._moveSpeed;
                        }
                        if (this._moving.Right) {
                            velocity.X += this._moveSpeed;
                        }
                    }
                }

                this.Velocity = velocity;
            };

            LinearMovementController.prototype.UpdateVelocityWithMultiDirection = function () {
                var velocity = eg.Vector2d.Zero();

                if (this._moving.Up) {
                    velocity.Y -= this._moveSpeed;
                }
                if (this._moving.Down) {
                    velocity.Y += this._moveSpeed;
                }
                if (this._moving.Left) {
                    velocity.X -= this._moveSpeed;
                }
                if (this._moving.Right) {
                    velocity.X += this._moveSpeed;
                }

                this.Velocity = velocity;
            };

            LinearMovementController.prototype.UpdateRotation = function () {
                if (!this.Velocity.IsZero()) {
                    this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
                }
            };
            return LinearMovementController;
        })(MovementControllers.Abstractions.MovementController);
        MovementControllers.LinearMovementController = LinearMovementController;
    })(eg.MovementControllers || (eg.MovementControllers = {}));
    var MovementControllers = eg.MovementControllers;
})(eg || (eg = {}));
