var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CharacterMover = (function (_super) {
    __extends(CharacterMover, _super);
    function CharacterMover(canvas) {
        _super.call(this, canvas);
        this._characterMoveSpeed = 100;
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
        this._zoomInKeys = [
            "r", 
            "'"
        ];
        this._zoomOutKeys = [
            "f", 
            "/"
        ];
        this._character = new EndGate.Core.Graphics.Shapes.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "brown");
        this._characterMovementController = new EndGate.Core.MovementControllers.LinearMovementController([
            this._character
        ], this._characterMoveSpeed);
        this._characterMovementController.Position = this._character.Position;
        this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
        this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
        this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
        this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
        this.BindKeys(this._zoomInKeys, "OnCommandDown", "ZoomingIn", true);
        this.BindKeys(this._zoomOutKeys, "OnCommandDown", "ZoomingOut", true);
        this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
        this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
        this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
        this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);
        this.Scene.Add(this._character);
    }
    CharacterMover.prototype.Update = function (gameTime) {
        this._characterMovementController.Update(gameTime);
    };
    CharacterMover.prototype.BindKeys = function (keyList, bindingAction, direction, directionValue) {
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
    return CharacterMover;
})(EndGate.Core.Game);
//@ sourceMappingURL=assetsMovementControllers.js.map
