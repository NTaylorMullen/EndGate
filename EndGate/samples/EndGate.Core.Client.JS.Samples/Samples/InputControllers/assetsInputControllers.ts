/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class CharacterMover extends eg.Game {
    private _characterMoveSpeed: number = 100;

    private _character: eg.Graphics.Rectangle;
    private _characterMovementController: eg.MovementControllers.LinearMovementController;
    private _characterInputController: eg.InputControllers.DirectionalInputController;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new eg.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;
        this._characterInputController = new eg.InputControllers.DirectionalInputController(this.Input.Keyboard, (direction: string, startMoving: bool) => {
            this._characterMovementController.Move(direction, startMoving);
        });

        this.Scene.Add(this._character);
    }

    public Update(gameTime: eg.GameTime): void {
        this._characterMovementController.Update(gameTime);
    }
}