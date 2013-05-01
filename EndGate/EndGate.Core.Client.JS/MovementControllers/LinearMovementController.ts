/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Interfaces/IMoveable.d.ts" />
/// <reference path="../Utilities/NoopTripInvoker.ts" />
/// <reference path="../Extensions/MathExtensions.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="../Utilities/EventHandler.ts" />
/// <reference path="LinearDirections.ts" />
/// <reference path="IMoveEvent.d.ts" />
/// <reference path="MovementController.ts" />

module EndGate.MovementControllers {

    export class LinearMovementController extends Abstractions.MovementController {
        private _moveSpeed: number;
        private _moving: Assets.LinearDirections;
        private _rotationUpdater: EndGate._.Utilities.NoopTripInvoker;
        private _velocityUpdater: Function;

        constructor(moveables: IMoveable[], moveSpeed: number, rotateWithMovements?: bool = true, multiDirectional?: bool = true) {
            super(moveables);

            this._moveSpeed = moveSpeed;
            this._moving = new Assets.LinearDirections();
            this.OnMove = new EventHandler();
            this._rotationUpdater = new EndGate._.Utilities.NoopTripInvoker(() => {
                this.UpdateRotation();
            }, rotateWithMovements);

            if (multiDirectional) {
                this._velocityUpdater = this.UpdateVelocityWithMultiDirection;
            }
            else {
                this._velocityUpdater = this.UpdateVelocityNoMultiDirection;
            }
        }

        public OnMove: EventHandler;

        public IsMovingInDirection(direction: string): bool {
            return this._moving[direction] || false;
        }

        public StartMoving(direction: string): void {
            this.Move(direction, true);
        }

        public StopMoving(direction: string): void {
            this.Move(direction, false);
        }

        public MoveSpeed(speed?: number): number {
            if (typeof speed !== "undefined") {
                this._moveSpeed = speed;
                this._velocityUpdater();
            }

            return this._moveSpeed;
        }

        public Update(gameTime: GameTime): void {
            if (!this._frozen) {
                this.Position = this.Position.Add(this.Velocity.Multiply(gameTime.ElapsedSecond));

                super.Update(gameTime);
            }
        }

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
            var velocity = Vector2d.Zero();

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
            var velocity = Vector2d.Zero();

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