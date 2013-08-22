/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="KnightAnimationHandler.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var RawRPG;
(function (RawRPG) {
    var Knight = (function (_super) {
        __extends(Knight, _super);
        function Knight(startPosition) {
            _super.call(this, new eg.Bounds.BoundingCircle(startPosition, Knight.HitboxRadius));

            // This is our sprite sheet for all of our knight animations
            var imageSource = new eg.Graphics.ImageSource("/Content/Samples/RawRPG/images/golden_knight.png", 576, 256);

            // Our Sprite2d will reference our sprite sheet directly and our animation will update the image source directly
            this.Graphic = new eg.Graphics.Sprite2d(startPosition.X, startPosition.Y, imageSource, 64, 64);
            this.Graphic.ZIndex = 5;

            // We create a movement controller and it will control the bounds and the graphic.  Therefore whenever the movement controller
            // moves it will update the bounds and graphic position as well
            // rotateWithMovements means we rotate whatever the movement controller is monitoring (bounds and graphic in this case) to coincide with the direction
            // : since we set it to false that means we're going to depict rotation via the animation, not the actual graphic rotating
            // multiDirectional means we can combine movement directions together aka up & left
            // : since we set it to false that means we can only go up, down left or right, no diagonals.
            this.MovementController = new eg.MovementControllers.LinearMovementController([this.Bounds, this.Graphic], Knight.MoveSpeed, false, false);
            this.MovementController.Position = startPosition;
            this.AnimationHandler = new RawRPG.KnightAnimationHandler(this);
        }
        // Updates the movement controller to abide by controls and update the animation handler so that the knights graphic is updated correctly
        Knight.prototype.Update = function (gameTime) {
            this.MovementController.Update(gameTime);
            this.AnimationHandler.Update(gameTime);
        };
        Knight.HitboxRadius = 64;

        Knight.MoveSpeed = 100;
        return Knight;
    })(eg.Collision.Collidable);
    RawRPG.Knight = Knight;
})(RawRPG || (RawRPG = {}));
//# sourceMappingURL=Knight.js.map
