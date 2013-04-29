/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Interfaces/IMoveable.d.ts" />
/// <reference path="../Utilities/NoopTripInvoker.ts" />
/// <reference path="../Extensions/MathExtensions.ts" />
/// <reference path="../GameTime.ts" />
/// <reference path="LinearDirections.ts" />
/// <reference path="MovementController.ts" />

module EndGate.Core.MovementControllers {

    export class LinearMovementController extends MovementController {
        private _moveSpeed: number;
        private _moving: LinearDirections;
        private _rotationUpdater: Utilities.NoopTripInvoker;

        constructor(moveables: IMoveable[], moveSpeed: number, rotateWithMovements?: bool = true) {
            super(moveables);

            this._moveSpeed = moveSpeed;
            this._moving = new LinearDirections();
            this._rotationUpdater = new Utilities.NoopTripInvoker(() => {
                this.UpdateRotation();
            }, rotateWithMovements);
        }

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
                this.UpdateVelocity();
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
                this.UpdateVelocity();
                this._rotationUpdater.Invoke();
            }
            else {
                throw new Error(direction + " is an unknown direction.");
            }
        }

        private UpdateVelocity(): void {
            var velocity = Assets.Vector2d.Zero();

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