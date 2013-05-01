/// <reference path="../Input/Keyboard/KeyboardHandler.ts" />
/// <reference path="../MovementControllers/LinearDirections.ts" />

module EndGate.InputControllers {

    export class DirectionalInputController {
        private _keyboard: Input.KeyboardHandler;
        private _onMove: (direction: string, startMoving: bool) => void;
        private _directions: MovementControllers.Assets.LinearDirections;

        constructor(keyboard: Input.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void , upKeys?: string[] = ["w", "Up"], rightKeys?: string[] = ["d", "Right"], downKeys?: string[] = ["s", "Down"], leftKeys?: string[] = ["a", "Left"]) {
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