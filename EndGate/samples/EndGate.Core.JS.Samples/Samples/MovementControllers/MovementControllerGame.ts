/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class MovementControllerGame extends eg.Game {
    // Default values for the movement controller
    private _characterMoveSpeed: number = 100;
    private _characterSize: eg.Size2d = new eg.Size2d(50, 30);
    private _characterColor: string = "brown";
    private _upKeys: string[] = ["w", "up"];
    private _rightKeys: string[] = ["d", "right"];
    private _downKeys: string[] = ["s", "down"];
    private _leftKeys: string[] = ["a", "left"];

    // Our character that we will e controlling is a rectangle
    private _character: eg.Graphics.Rectangle;
    // Linear movement controllers are up, left, right, down or a combination of two movements (up & left etc.).
    private _characterMovementController: eg.MovementControllers.LinearMovementController;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // Start the character out at in the middle of the game area
        this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, this._characterSize.Width, this._characterSize.Height, this._characterColor);
        // Create our character movement controller that will be used to control our character
        this._characterMovementController = new eg.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);
        // Update the movement controllers position to match the character's start position
        this._characterMovementController.Position = this._character.Position;

        // Bind all of the keyboard control events to the corresponding movements
        this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
        this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
        this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
        this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
        this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
        this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
        this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
        this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);

        // Draw our character on the screen
        this.Scene.Add(this._character);
    }

    // We need to update the movement controller so that it can move in the appropriate direction
    public Update(gameTime: eg.GameTime): void {
        this._characterMovementController.Update(gameTime);
    }

    // Helper function to bind keyboard controls to trigger the appropriate movement controller bindings
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