/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="Knight.ts" />

class Player {
    private _controller: eg.InputControllers.DirectionalInputController;

    constructor(keyboard: EndGate.Core.Input.Keyboard.KeyboardHandler, knight: Knight) {
        this._controller = new eg.InputControllers.DirectionalInputController(keyboard, () => {
            knight.MovementController.Move.apply(knight.MovementController, arguments);
        });
    }
}