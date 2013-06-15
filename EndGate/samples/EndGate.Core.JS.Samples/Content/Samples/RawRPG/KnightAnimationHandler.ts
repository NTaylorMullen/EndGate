/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Knight.ts" />

// Wrap in module to keep code out of global scope
module RawRPG {

    export class KnightAnimationHandler implements eg.IUpdateable {
        private static _animationDirectionMap: string[] = ["Up", "Left", "Down", "Right"];

        private _movementList: string[];
        private _knight: Knight;
        private _animations: { [direction: string]: eg.Graphics.SpriteAnimation; };
        private _currentAnimation: eg.Graphics.SpriteAnimation;

        constructor(knight: Knight) {
            this._knight = knight;
            this._animations = {};

            // Map every direction to a corresponding animation direction
            for (var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
                this._animations[KnightAnimationHandler._animationDirectionMap[i]] = new eg.Graphics.SpriteAnimation(knight.Graphic.Image, 18, new eg.Size2d(64, 64), 9, new eg.Vector2d(0, i * 64));
            }

            // Tie into the OnMove event handler of the movement controller so we can play the correct animation
            this._knight.MovementController.OnMove.Bind((moveEvent: eg.MovementControllers.IMoveEvent) => {
                this.KnightMove(moveEvent);
            });

            this._movementList = [];

            // Set the default animation to Up and stop it from playing (so we're not walking in place)
            this._currentAnimation = this._animations["Up"];
            this._currentAnimation.Stop();
        }

        private KnightMove(moveEvent: eg.MovementControllers.IMoveEvent): void {
            // Since the current animation depends on the current velocity we can't just purely rely on the moveEvent.Direction

            // Calculate the sign of the velocity. It essentially converts the axi of the vector2d to -1, 0 or -1
            var velocitySign = this._knight.MovementController.Velocity.Sign(),
                activeAnimation: eg.Graphics.SpriteAnimation;

            // Check if we're stopping our current animation
            if (moveEvent.StartMoving === false && this._animations[moveEvent.Direction] === this._currentAnimation) {
                this._currentAnimation.Stop();
            }

            if (velocitySign.X === -1) {
                activeAnimation = this._animations["Left"];
            } else if (velocitySign.X === 1) {
                activeAnimation = this._animations["Right"];
            }

            if (velocitySign.Y === -1) {
                activeAnimation = this._animations["Up"];
            } else if (velocitySign.Y === 1) {
                activeAnimation = this._animations["Down"];
            }

            if (activeAnimation) {
                this._currentAnimation.Stop();
                this._currentAnimation = activeAnimation;
                // Play the animation on repeat
                this._currentAnimation.Play(true);
            }
        }

        // Update the current animation so it cycles through frames
        public Update(gameTime: eg.GameTime): void {
            this._currentAnimation.Update(gameTime);
        }
    }

}