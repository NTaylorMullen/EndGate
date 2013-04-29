/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class CharacterMover extends EndGate.Core.Game {
    private _characterMoveSpeed: number = 100;
    private _upKeys: string[] = ["w", "up"];
    private _rightKeys: string[] = ["d", "right"];
    private _downKeys: string[] = ["s", "down"];
    private _leftKeys: string[] = ["a", "left"];
    private _zoomInKeys: string[] = ["r", "'"];
    private _zoomOutKeys: string[] = ["f", "/"];

    private _character: EndGate.Core.Graphics.Shapes.Rectangle;
    private _characterMovementController: EndGate.Core.MovementControllers.LinearMovementController;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._character = new EndGate.Core.Graphics.Shapes.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new EndGate.Core.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;

        this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
        this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
        this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
        this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
        this.BindKeys(this._zoomInKeys, "OnCommandDown", "ZoomingIn", true);
        this.BindKeys(this._zoomOutKeys, "OnCommandDown", "ZoomingOut", true);
        this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
        this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
        this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
        this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);        

        this.Scene.Add(this._character);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._characterMovementController.Update(gameTime);
    }

    private BindKeys(keyList: string[], bindingAction: string, direction: string, directionValue: bool): void {
        for (var i = 0; i < keyList.length; i++) {
            this.Input.Keyboard[bindingAction](keyList[i], () => {
                if (directionValue) {
                    this._characterMovementController.StartMoving(direction);
                }
                else {
                    this._characterMovementController.StopMoving(direction);
                }
            });
        }
    }
}