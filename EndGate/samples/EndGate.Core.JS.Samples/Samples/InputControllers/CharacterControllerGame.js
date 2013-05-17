var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CharacterControllerGame = (function (_super) {
    __extends(CharacterControllerGame, _super);
    function CharacterControllerGame(canvas) {
        var _this = this;
        _super.call(this, canvas);
        this._characterMoveSpeed = 100;
        this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new eg.MovementControllers.LinearMovementController([
            this._character
        ], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;
        this._characterInputController = new eg.InputControllers.DirectionalInputController(this.Input.Keyboard, function (direction, startMoving) {
            _this._characterMovementController.Move(direction, startMoving);
        });
        this.Scene.Add(this._character);
    }
    CharacterControllerGame.prototype.Update = function (gameTime) {
        this._characterMovementController.Update(gameTime);
    };
    return CharacterControllerGame;
})(eg.Game);
//@ sourceMappingURL=CharacterControllerGame.js.map
