var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MovementControllerGame = (function (_super) {
    __extends(MovementControllerGame, _super);
    function MovementControllerGame(canvas) {
        _super.call(this, canvas);
        this._characterMoveSpeed = 100;
        this._characterSize = new eg.Size2d(50, 30);
        this._characterColor = "brown";
        this._upKeys = [
            "w", 
            "up"
        ];
        this._rightKeys = [
            "d", 
            "right"
        ];
        this._downKeys = [
            "s", 
            "down"
        ];
        this._leftKeys = [
            "a", 
            "left"
        ];
        this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, this._characterSize.Width, this._characterSize.Height, this._characterColor);
        this._characterMovementController = new eg.MovementControllers.LinearMovementController([
            this._character
        ], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;
        this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
        this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
        this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
        this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
        this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
        this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
        this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
        this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);
        this.Scene.Add(this._character);
    }
    MovementControllerGame.prototype.Update = function (gameTime) {
        this._characterMovementController.Update(gameTime);
    };
    MovementControllerGame.prototype.BindKeys = function (keyList, bindingAction, direction, directionValue) {
        var _this = this;
        for(var i = 0; i < keyList.length; i++) {
            this.Input.Keyboard[bindingAction](keyList[i], function () {
                if(directionValue) {
                    _this._characterMovementController.StartMoving(direction);
                } else {
                    _this._characterMovementController.StopMoving(direction);
                }
            });
        }
    };
    return MovementControllerGame;
})(eg.Game);
//@ sourceMappingURL=MovementControllerGame.js.map
