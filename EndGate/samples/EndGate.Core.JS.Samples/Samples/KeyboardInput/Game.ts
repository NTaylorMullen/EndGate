/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="CommandBinder.ts" />
/// <reference path="KeyboardStatusUpdater.ts" />

// Wrap in module to keep code out of global scope
module KeyboardInput {

    export class Game extends eg.Game {
        private _commandBinder: CommandBinder;
        private _keyboardStatusUpdater: KeyboardStatusUpdater;

        constructor(canvas: HTMLCanvasElement, bindButton: JQuery, unbindButton: JQuery, bindingCommandInput: JQuery, bindingResultInput: JQuery, commandHolder: JQuery) {
            super(canvas);

            this._commandBinder = new CommandBinder(this.Input.Keyboard, new eg.Vector2d(canvas.width / 2, canvas.height / 2), this.Scene, bindButton, unbindButton, bindingCommandInput, bindingResultInput, commandHolder);
            this._keyboardStatusUpdater = new KeyboardStatusUpdater(this.Scene, this.Input.Keyboard);
        }
    }

}