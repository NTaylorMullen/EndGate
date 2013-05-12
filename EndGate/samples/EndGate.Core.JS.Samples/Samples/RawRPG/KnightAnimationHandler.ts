/// <reference path="Knight.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class KnightAnimationHandler implements eg.IUpdateable {
    private static _animationDirectionMap: string[] = ["Up", "Left", "Down", "Right"];
    private _movementList: string[];
    private _knight: Knight;
    private _animations: { [direction: string]: eg.Graphics.SpriteAnimation; };
    private _currentAnimation: eg.Graphics.SpriteAnimation;

    constructor(knight: Knight) {
        this._knight = knight;
        this._animations = {};

        for (var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
            this._animations[KnightAnimationHandler._animationDirectionMap[i]] = new eg.Graphics.SpriteAnimation(knight.Graphic.Image, 18, new eg.Size2d(64, 64), 9, new eg.Vector2d(0, i * 64));
        }

        this._knight.MovementController.OnMove.Bind((moveEvent: eg.MovementControllers.IMoveEvent) => {
            this.KnightMove(moveEvent);
        });

        this._movementList = [];

        this._currentAnimation = this._animations["Up"];
        this._currentAnimation.Stop();
    }

    private KnightMove(moveEvent: eg.MovementControllers.IMoveEvent): void {
        var velocitySign = this._knight.MovementController.Velocity.Sign(),
            activeAnimation: eg.Graphics.SpriteAnimation;

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
            this._currentAnimation.Play(true);
        }
    }

    public Update(gameTime: eg.GameTime): void {
        for (var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
            this._animations[KnightAnimationHandler._animationDirectionMap[i]].Update(gameTime);
        }
    }
}