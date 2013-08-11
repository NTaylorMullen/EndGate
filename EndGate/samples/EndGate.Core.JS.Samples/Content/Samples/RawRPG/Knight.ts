/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="KnightAnimationHandler.ts" />

// Wrap in module to keep code out of global scope
module RawRPG {

    export class Knight extends eg.Collision.Collidable implements eg.IUpdateable {
        // Even though our knight is drawn as a rectangle we have a hit box of a circle
        public static HitboxRadius: number = 64;
        // How fast our knight will move
        public static MoveSpeed: number = 100;

        public Graphic: eg.Graphics.Sprite2d;
        public MovementController: eg.MovementControllers.LinearMovementController;
        public AnimationHandler: KnightAnimationHandler;

        constructor(startPosition: eg.Vector2d) {
            super(new eg.Bounds.BoundingCircle(startPosition, Knight.HitboxRadius));

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
            this.MovementController = new eg.MovementControllers.LinearMovementController(<eg.IMoveable[]>[this.Bounds, this.Graphic], Knight.MoveSpeed, /*rotateWithMovements*/ false, /*multiDirectional*/ false);
            this.MovementController.Position = startPosition;
            this.AnimationHandler = new KnightAnimationHandler(this);
        }

        // Updates the movement controller to abide by controls and update the animation handler so that the knights graphic is updated correctly
        public Update(gameTime: eg.GameTime): void {
            this.MovementController.Update(gameTime);
            this.AnimationHandler.Update(gameTime);
        }
    }

}