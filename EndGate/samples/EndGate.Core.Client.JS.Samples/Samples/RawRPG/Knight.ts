/// <reference path="KnightAnimationHandler.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class Knight implements eg.IUpdateable extends eg.Collision.Collidable {
    public static HitboxSize: number = 30;
    public static MoveSpeed: number = 100;

    public Graphic: eg.Graphics.Sprite2d;
    public MovementController: eg.MovementControllers.LinearMovementController;
    public AnimationHandler: KnightAnimationHandler;

    constructor(startPosition: eg.Vector2d) {
        super(new eg.Bounds.BoundingCircle(startPosition, Knight.HitboxSize));

        var imageSource = new eg.Graphics.Assets.ImageSource("images/golden_knight.png", 576, 256, 0, 0);
        this.Graphic = new eg.Graphics.Sprite2d(startPosition.X, startPosition.Y, imageSource, 64, 64);
        this.MovementController = new eg.MovementControllers.LinearMovementController([this.Bounds, this.Graphic], Knight.MoveSpeed,false,false);        
        this.MovementController.Position = startPosition;
        this.AnimationHandler = new KnightAnimationHandler(this);
    }

    public Update(gameTime: eg.GameTime): void {
        this.MovementController.Update(gameTime);
        this.AnimationHandler.Update(gameTime);
    }
}