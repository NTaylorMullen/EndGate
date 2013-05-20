var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(startPosition) {
        _super.call(this, new eg.Bounds.BoundingCircle(startPosition, Knight.HitboxRadius));
        var imageSource = new eg.Graphics.Assets.ImageSource("images/golden_knight.png", 576, 256, 0, 0);
        this.Graphic = new eg.Graphics.Sprite2d(startPosition.X, startPosition.Y, imageSource, 64, 64);
        this.MovementController = new eg.MovementControllers.LinearMovementController([
            this.Bounds, 
            this.Graphic
        ], Knight.MoveSpeed, false, false);
        this.MovementController.Position = startPosition;
        this.AnimationHandler = new KnightAnimationHandler(this);
    }
    Knight.HitboxRadius = 64;
    Knight.MoveSpeed = 100;
    Knight.prototype.Update = function (gameTime) {
        this.MovementController.Update(gameTime);
        this.AnimationHandler.Update(gameTime);
    };
    return Knight;
})(eg.Collision.Collidable);
//@ sourceMappingURL=Knight.js.map
