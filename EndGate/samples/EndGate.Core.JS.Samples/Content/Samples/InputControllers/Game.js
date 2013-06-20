var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var InputControllers;
(function (InputControllers) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            var _this = this;
            _super.call(this, canvas);
            this._characterMoveSpeed = 100;

            // Our character is our rectangle graphic
            this._character = new eg.Graphics.Rectangle(canvas.width / 2, canvas.height / 2, 50, 30, "green");

            // Create a MovementController to handle moving the character correctly
            this._characterMovementController = new eg.MovementControllers.LinearMovementController([this._character], this._characterMoveSpeed);

            // Update the MovementControllers position to match the characters position
            this._characterMovementController.Position = this._character.Position;

            // Wire up the Input Controller to trigger appropriate flags on the movement controller
            this._characterInputController = new eg.InputControllers.DirectionalInputController(this.Input.Keyboard, function (direction, startMoving) {
                _this._characterMovementController.Move(direction, startMoving);
            });

            // Draw the character
            this.Scene.Add(this._character);
        }
        // Allow the MovementController to update its position based on active flags
        Game.prototype.Update = function (gameTime) {
            this._characterMovementController.Update(gameTime);
        };
        return Game;
    })(eg.Game);
    InputControllers.Game = Game;
})(InputControllers || (InputControllers = {}));
//@ sourceMappingURL=Game.js.map
