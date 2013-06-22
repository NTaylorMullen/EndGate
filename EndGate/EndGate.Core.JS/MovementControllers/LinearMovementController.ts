/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Utilities/NoopTripInvoker.ts" />
/// <reference path="../Extensions/MathExtensions.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="../Utilities/EventHandler1.ts" />
/// <reference path="LinearDirections.ts" />
/// <reference path="IMoveEvent.ts" />
/// <reference path="MovementController.ts" />

module eg.MovementControllers {

    /**
    * Defines a LinearMovementController that can move objects Up, Right, Left, Down or a combination.
    */
    export class LinearMovementController extends Abstractions.MovementController {
        private _moveSpeed: number;
        private _moving: Assets.LinearDirections;
        private _rotationUpdater: eg._.Utilities.NoopTripInvoker;
        private _velocityUpdater: Function;

        /**
        * Creates a new instance of the LinearMovementController object which rotates the provided moveable's on movements and can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        */
        constructor(movables: IMoveable[], moveSpeed: number);
        /**
        * Creates a new instance of the LinearMovementController object which can move diagonally.
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction, default is true (this cannot change after construction).
        */
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: bool);
        /**
        * Creates a new instance of the LinearMovementController object..
        * @param movables Array of moveable objects that will be moved when the movement controller moves (this cannot change after construction).
        * @param moveSpeed How fast the movement controller will move.
        * @param rotateWithMovements Whether the movables should rotate to face their moving direction.  Default is true (this cannot change after construction).
        * @param multiDirectional Whether multiple movements can occur simultaneously, resulting in diagonal movements. Default is true (this cannot change after construction).
        */
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: bool, multiDirectional: bool);
        constructor(movables: IMoveable[], moveSpeed: number, rotateWithMovements: bool = true, multiDirectional: bool = true) {
            super(movables);

            this._moveSpeed = moveSpeed;
            this._moving = new Assets.LinearDirections();
            this.OnMove = new EventHandler1<IMoveEvent>();
            this._rotationUpdater = new eg._.Utilities.NoopTripInvoker(() => {
                this.UpdateRotation();
            }, rotateWithMovements);

            if (multiDirectional) {
                this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
            }
            else {
                this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
            }
        }

        /**
        * Event: Triggered when a the movement controller starts or stops a movement.  Functions can be bound or unbound to this event to be executed when the event triggers.
        * Passes an IMoveEvent to bound functions.
        */
        public OnMove: EventHandler1<IMoveEvent>;

        /**
        * Determines if the movement controller is moving in the provided direction.
        * @param direction The direction to check.
        */
        public IsMovingInDirection(direction: string): bool {
            return this._moving[direction] || false;
        }

        /**
        * Starts moving the movement controller in the specified direction.
        * @param direction The direction to start moving.
        */
        public StartMoving(direction: string): void {
            this.Move(direction, true);
        }
        
        /**
        * Stops the movement controller from moving in the specified direction.
        * @param direction The direction to stop moving.
        */
        public StopMoving(direction: string): void {
            this.Move(direction, false);
        }

        /**
        * Gets the current move speed.
        */
        public MoveSpeed(): number;
        /**
        * Sets and gets the current move speed.
        * @param speed The new move speed.
        */
        public MoveSpeed(speed: number): number;
        public MoveSpeed(speed?: number): number {
            if (typeof speed !== "undefined") {
                this._moveSpeed = speed;
                this._velocityUpdater();
            }

            return this._moveSpeed;
        }

        /**
        * Moves the LinearMovementController in the currently active directions.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            if (!this._frozen) {
                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.ElapsedSecond));

                super.Update(gameTime);
            }
        }

        /**
        * Triggers a move event on the MovementController.
        * @param direction The direction to start or stop moving.
        * @param startMoving Whether the movement is starting or stopping.
        */
        public Move(direction: string, startMoving: bool): void {
            if (typeof this._moving[direction] !== "undefined") {
                this._moving[direction] = startMoving;
                this._velocityUpdater();
                this._rotationUpdater.Invoke();
                this.OnMove.Trigger(<IMoveEvent>{
                    Direction: direction,
                    StartMoving: startMoving
                });
            }
            else {
                throw new Error(direction + " is an unknown direction.");
            }
        }

        private UpdateVelocityNoMultiDirection(): void {
            var velocity = Vector2d.Zero;

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
        }

        private UpdateVelocityWithMultiDirection(): void {
            var velocity = Vector2d.Zero;

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
        }

        private UpdateRotation(): void {
            if (!this.Velocity.IsZero()) {
                this.Rotation = Math.atan2(this.Velocity.Y, this.Velocity.X);
            }
        }
    }

}