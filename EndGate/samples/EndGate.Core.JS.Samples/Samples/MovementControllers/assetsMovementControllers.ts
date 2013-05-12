/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class CharacterMover extends eg.Game {
    private _characterMoveSpeed: number = 100;
    private _upKeys: string[] = ["w", "up"];
    private _rightKeys: string[] = ["d", "right"];
    private _downKeys: string[] = ["s", "down"];
    private _leftKeys: string[] = ["a", "left"];

    private _character: eg.Graphics.Rectangle;
    private _characterMovementController: eg.MovementControllers.LinearMovementController;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new eg.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;

        this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
        this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
        this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
        this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
        this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
        this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
        this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
        this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);        

        this.Scene.Add(this._character);
    }

    public Update(gameTime: eg.GameTime): void {
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