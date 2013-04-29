var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CharacterMover = (function (_super) {
    __extends(CharacterMover, _super);
    function CharacterMover(canvas) {
        var _this = this;
        _super.call(this, canvas);
        this._characterMoveSpeed = 100;
        this._character = new EndGate.Core.Graphics.Shapes.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new EndGate.Core.MovementControllers.LinearMovementController([
            this._character
        ], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;
        this._characterInputController = new EndGate.Core.Input.Controllers.DirectionalInputController(this.Input.Keyboard, function (direction, startMoving) {
            _this._characterMovementController.Move(direction, startMoving);
        });
        this.Scene.Add(this._character);
    }
    CharacterMover.prototype.Update = function (gameTime) {
        this._characterMovementController.Update(gameTime);
    };
    return CharacterMover;
})(EndGate.Core.Game);
//@ sourceMappingURL=assetsInputControllers.js.map
