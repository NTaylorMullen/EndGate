/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="Knight.ts" />

class Player {
    private _controller: eg.InputControllers.DirectionalInputController;

    constructor(keyboard: eg.Input.KeyboardHandler, knight: Knight) {
        this._controller = new eg.InputControllers.DirectionalInputController(keyboard, () => {
            knight.MovementController.Move.apply(knight.MovementController, arguments);
        });
    }
}