/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module InputControllers {

    export class Game extends eg.Game {
        private _characterMoveSpeed: number = 100;

        private _character: eg.Graphics.Rectangle;
        private _characterMovementController: eg.MovementControllers.LinearMovementController;
        private _characterInputController: eg.InputControllers.DirectionalInputController;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);

            // Our character is our rectangle graphic
            this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, eg.Graphics.Color.Green);

            // Create a MovementController to handle moving the character correctly
            this._characterMovementController = new eg.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);
            // Update the MovementControllers position to match the characters position
            this._characterMovementController.Position = this._character.Position;
            // Wire up the Input Controller to trigger appropriate flags on the movement controller
            this._characterInputController = new eg.InputControllers.DirectionalInputController(this.Input.Keyboard, (direction: string, startMoving: boolean) => {
                this._characterMovementController.Move(direction, startMoving);
            });

            // Draw the character
            this.Scene.Add(this._character);
        }

        // Allow the MovementController to update its position based on active flags
        public Update(gameTime: eg.GameTime): void {
            this._characterMovementController.Update(gameTime);
        }
    }

}