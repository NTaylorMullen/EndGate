/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="Knight.ts" />

// Wrap in module to keep code out of global scope
module RawRPG {

    export class Player {
        private _controller: eg.InputControllers.DirectionalInputController;

        constructor(keyboard: eg.Input.KeyboardHandler, knight: Knight) {
            // Use a DirectionalInputController to handle keyboard input
            // First parameter is the keyboard handler for the game and the second is the OnMove event
            // The OnMove event is triggered when the DirectionalInputController detects that the user
            // is trying to move in a given direction
            this._controller = new eg.InputControllers.DirectionalInputController(keyboard, (direction: string, startMoving: bool) => {
                knight.MovementController.Move(direction, startMoving);
            });
        }
    }

}