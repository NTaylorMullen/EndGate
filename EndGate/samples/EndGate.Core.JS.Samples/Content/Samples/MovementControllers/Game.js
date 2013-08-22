/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var MovementControllers;
(function (MovementControllers) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            _super.call(this, canvas);
            // Default values for the movement controller
            this._characterMoveSpeed = 100;
            this._characterSize = new eg.Size2d(50, 30);
            this._characterColor = eg.Graphics.Color.Brown;
            this._upKeys = ["w", "up"];
            this._rightKeys = ["d", "right"];
            this._downKeys = ["s", "down"];
            this._leftKeys = ["a", "left"];

            // Start the character out at in the middle of the game area
            this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, this._characterSize.Width, this._characterSize.Height, this._characterColor);

            // Create our character movement controller that will be used to control our character
            this._characterMovementController = new eg.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);

            // Update the movement controllers position to match the character's start position
            this._characterMovementController.Position = this._character.Position;

            // Bind all of the keyboard control events to the corresponding movements
            this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
            this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
            this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
            this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
            this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
            this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
            this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
            this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);

            // Draw our character on the screen
            this.Scene.Add(this._character);
        }
        // We need to update the movement controller so that it can move in the appropriate direction
        Game.prototype.Update = function (gameTime) {
            this._characterMovementController.Update(gameTime);
        };

        // Helper function to bind keyboard controls to trigger the appropriate movement controller bindings
        Game.prototype.BindKeys = function (keyList, bindingAction, direction, directionValue) {
            var _this = this;
            for (var i = 0; i < keyList.length; i++) {
                this.Input.Keyboard[bindingAction](keyList[i], function () {
                    if (directionValue) {
                        _this._characterMovementController.StartMoving(direction);
                    } else {
                        _this._characterMovementController.StopMoving(direction);
                    }
                });
            }
        };
        return Game;
    })(eg.Game);
    MovementControllers.Game = Game;
})(MovementControllers || (MovementControllers = {}));
//# sourceMappingURL=Game.js.map
