/// <reference path="../Keyboard/KeyboardHandler.ts" />

module EndGate.Core.Input.Controllers {

    export class DirectionalInputController {
        private _keyboard: Keyboard.KeyboardHandler;
        private _onMove: (direction: string, startMoving: bool) => void;

        constructor(keyboard: Keyboard.KeyboardHandler, onMove: (direction: string, startMoving: bool) => void , upKeys?: string[] = ["w", "Up"], rightKeys?: string[] = ["d", "Right"], downKeys?: string[] = ["s", "Down"], leftKeys?: string[] = ["a", "Left"]) {
            this._keyboard = keyboard;
            this._onMove = onMove;

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
                    this._onMove(direction, startMoving);
                });
            }
        }
    }

}