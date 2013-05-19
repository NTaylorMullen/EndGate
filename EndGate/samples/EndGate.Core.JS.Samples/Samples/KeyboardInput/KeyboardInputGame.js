var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KeyboardInputGame = (function (_super) {
    __extends(KeyboardInputGame, _super);
    function KeyboardInputGame(canvas, bindButton, unbindButton, bindingCommandInput, bindingResultInput, commandHolder) {
        _super.call(this, canvas);
        this._commandBinder = new CommandBinder(this.Input.Keyboard, new eg.Vector2d(canvas.width / 2, canvas.height / 2), this.Scene, bindButton, unbindButton, bindingCommandInput, bindingResultInput, commandHolder);
        this._keyboardStatusUpdater = new KeyboardStatusUpdater(this.Scene, this.Input.Keyboard);
    }
    return KeyboardInputGame;
})(eg.Game);
//@ sourceMappingURL=KeyboardInputGame.js.map
