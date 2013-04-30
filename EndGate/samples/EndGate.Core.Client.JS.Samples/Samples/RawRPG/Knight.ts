/// <reference path="../../Scripts/endGate.core.client.ts" />

class Knight extends eg.Collision.Collidable {
    public static HitboxSize: number = 30;
    public static MoveSpeed: number = 100;

    public Graphic: eg.Graphics.Rectangle;
    public MovementController: eg.MovementControllers.LinearMovementController;

    constructor(startPosition: eg.Vector2d) {
        super(new eg.Bounds.BoundingCircle(startPosition, Knight.HitboxSize));

        this.Graphic = new eg.Graphics.Rectangle(startPosition.X, startPosition.Y, Knight.HitboxSize, Knight.HitboxSize, "black");
        this.MovementController = new eg.MovementControllers.LinearMovementController([this.Bounds, this.Graphic], Knight.MoveSpeed);
        this.MovementController.Position = startPosition;
    }
}