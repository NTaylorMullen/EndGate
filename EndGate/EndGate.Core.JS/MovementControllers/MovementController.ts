/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Interfaces/IMoveable.ts" />
/// <reference path="../Interfaces/IUpdateable.ts" />
/// <reference path="../GameTime.ts" />

module EndGate.MovementControllers.Abstractions {
    
    /**
    * Abstract class that holds moveable objects and synchronizes positions across them.
    */
    export class MovementController implements IMoveable, IUpdateable {
        /**
        * Gets or sets the position of the MovementController
        */
        public Position: Vector2d;
        /**
        * Gets or sets the velocity of the MovementController.
        */
        public Velocity: Vector2d;
        /**
        * Gets or sets the rotation of the MovementController
        */
        public Rotation: number;
        public _frozen: bool;
        private _moveables: IMoveable[];

        /**
        * Should only ever be called by derived classes.
        * @param moveables Moveable objects to synchronize.
        */
        constructor(moveables: IMoveable[]) {
            this.Position = Vector2d.Zero();
            this.Velocity = Vector2d.Zero();
            this.Rotation = 0;
            this._frozen = false;

            this._moveables = moveables;
        }

        /**
        * Prevents the MovementController from updating object locations.
        */
        public Freeze(): void {
            this._frozen = true;
        }

        /**
        * Used to re-enable movement within the MovementController.
        */
        public Thaw(): void {
            this._frozen = false;
        }

        /**
        * Determines if the MovementController is moving.  Frozen MovementControllers are not considered moving.
        */
        public IsMoving(): bool {
            return !this._frozen && !this.Velocity.IsZero();
        }

        /**
        * Synchronizes the current position with all tracked moveable objects.  MovementController's must be updated in order to move.
        * @param gameTime The current game time object.
        */
        public Update(gameTime: GameTime): void {
            // Sync moveables position and rotation
            for (var i = 0; i < this._moveables.length; i++) {
                this._moveables[i].Position = this.Position;
                this._moveables[i].Rotation = this.Rotation;
            }
        }
    }

}