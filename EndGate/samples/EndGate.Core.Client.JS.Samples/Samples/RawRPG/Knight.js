var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(startPosition) {
        _super.call(this, new eg.BoundingCircle(startPosition, Knight.HitboxSize));
        this.Graphic = new eg.Rectangle(startPosition.X, startPosition.Y, Knight.HitboxSize, Knight.HitboxSize, "black");
        this.MovementController = new eg.MovementControllers.LinearMovementController([
            this.Bounds, 
            this.Graphic
        ], Knight.MoveSpeed);
        this.MovementController.Position = startPosition;
    }
    Knight.HitboxSize = 30;
    Knight.MoveSpeed = 100;
    return Knight;
})(eg.Collidable);
//@ sourceMappingURL=Knight.js.map
