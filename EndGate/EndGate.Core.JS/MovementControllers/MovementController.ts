/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../GameTime.ts" />

module EndGate.MovementControllers.Abstractions {
    
    export class MovementController implements IMoveable, IUpdateable {
        public Position: Vector2d;
        public Velocity: Vector2d;
        public Rotation: number;
        public _frozen: bool;
        private _moveables: IMoveable[];

        constructor(moveables: IMoveable[]) {
            this.Position = Vector2d.Zero();
            this.Velocity = Vector2d.Zero();
            this.Rotation = 0;
            this._frozen = false;

            this._moveables = moveables;
        }

        public Freeze(): void {
            this._frozen = true;
        }

        public Thaw(): void {
            this._frozen = false;
        }

        public IsMoving(): bool {
            return !this._frozen && !this.Velocity.IsZero();
        }

        public Update(gameTime: GameTime): void {
            // Sync moveables position and rotation
            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
                this._moveables[i].Rotation = this.Rotation;
            }
        }
    }

}