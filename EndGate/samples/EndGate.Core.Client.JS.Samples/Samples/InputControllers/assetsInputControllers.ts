/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class CharacterMover extends EndGate.Core.Game {
    private _characterMoveSpeed: number = 100;

    private _character: EndGate.Core.Graphics.Shapes.Rectangle;
    private _characterMovementController: EndGate.Core.MovementControllers.LinearMovementController;
    private _characterInputController: EndGate.Core.Input.Controllers.DirectionalInputController;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._character = new EndGate.Core.Graphics.Shapes.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new EndGate.Core.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;
        this._characterInputController = new EndGate.Core.Input.Controllers.DirectionalInputController(this.Input.Keyboard, (direction: string, startMoving: bool) => {
            this._characterMovementController.Move(direction, startMoving);
        });

        this.Scene.Add(this._character);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._characterMovementController.Update(gameTime);
    }
}