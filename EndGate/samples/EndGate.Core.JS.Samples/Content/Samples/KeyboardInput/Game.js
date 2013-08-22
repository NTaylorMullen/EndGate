/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="CommandBinder.ts" />
/// <reference path="KeyboardStatusUpdater.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var KeyboardInput;
(function (KeyboardInput) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas, bindButton, unbindButton, bindingCommandInput, bindingResultInput, commandHolder) {
            _super.call(this, canvas);

            this._commandBinder = new KeyboardInput.CommandBinder(this.Input.Keyboard, new eg.Vector2d(canvas.width / 2, canvas.height / 2), this.Scene, bindButton, unbindButton, bindingCommandInput, bindingResultInput, commandHolder);
            this._keyboardStatusUpdater = new KeyboardInput.KeyboardStatusUpdater(this.Scene, this.Input.Keyboard);
        }
        return Game;
    })(eg.Game);
    KeyboardInput.Game = Game;
})(KeyboardInput || (KeyboardInput = {}));
//# sourceMappingURL=Game.js.map
