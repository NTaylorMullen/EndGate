/// <reference path="../Input/Keyboard/KeyboardHandler.ts" />
/// <reference path="../MovementControllers/LinearDirections.ts" />

module EndGate.InputControllers {

    /**
    * Defines a DirectionalInputController that will monitor Up, Right, Left, and Down movement attempts.
    */
    export class DirectionalInputController {
        private _keyboard: Input.KeyboardHandler;
        private _onMove: (direction: string, startMoving: bool) => void;
        private _directions: MovementControllers.Assets.LinearDirections;

        /**
        * Creates a new instance of the DirectionalInputController object with default key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        */
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void);
        /**
        * Creates a new instance of the DirectionalInputController object with custom key controls.
        * @param keyboard A keyboard handler in order to bind directional events.
        * @param onMove The function to trigger when the user attempts to perform a move.  Passes the direction ("Left", "Right", "Up", "Down") and whether the movement was started or stopped.
        * @param upKeys Array of keys to trigger an "Up" movement.  Default is ["w", "Up"].
        * @param rightKeys Array of keys to trigger a "Right" movement.  Default is ["d", "Right"].
        * @param downKeys Array of keys to trigger a "Down" movement.  Default is ["s", "Down"].
        * @param leftKeys Array of keys to trigger a "Left" movement.  Default is ["a", "Left"].
        */
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void , upKeys: string[], rightKeys: string[], downKeys: string[], leftKeys: string[]);
        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void, upKeys: string[] = ["w", "Up"], rightKeys: string[] = ["d", "Right"], downKeys: string[] = ["s", "Down"], leftKeys: string[] = ["a", "Left"]) {
            this._keyboard = keyboard;
            this._onMove = onMove;
            this._directions = new MovementControllers.Assets.LinearDirections();

            this.BindKeys(upKeys, "OnCommandDown", "Up", true);
            this.BindKeys(rightKeys, "OnCommandDown", "Right", true);
            this.BindKeys(downKeys, "OnCommandDown", "Down", true);
            this.BindKeys(leftKeys, "OnCommandDown", "Left", true);
            this.BindKeys(upKeys, "OnCommandUp", "Up", false);
            this.BindKeys(rightKeys, "OnCommandUp", "Right", false);
            this.BindKeys(downKeys, "OnCommandUp", "Down", false);
            this.BindKeys(leftKeys, "OnCommandUp", "Left", false);
        }

        private BindKeys(keyList: string[], bindingAction: string, direction: string, startMoving: bool): void {
            for (var i = 0; i < keyList.length; i++) {
                this._keyboard[bindingAction](keyList[i], () => {
                    if (this._directions[direction] != startMoving) {
                        this._directions[direction] = startMoving;
                        this._onMove(direction, startMoving);
                    }
                });
            }
        }
    }

}