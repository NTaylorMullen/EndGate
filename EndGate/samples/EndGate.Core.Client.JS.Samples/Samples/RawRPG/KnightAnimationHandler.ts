/// <reference path="Knight.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class KnightAnimationHandler implements eg.IUpdateable {
    private static _animationDirectionMap: string[] = ["Up", "Left", "Down", "Right"];
    private _knight: Knight;
    private _animations: { [direction: string]: eg.Graphics.SpriteAnimation; };

    constructor(knight: Knight) {
        this._knight = knight;
        this._animations = {};

        for (var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
            this._animations[KnightAnimationHandler._animationDirectionMap[i]] = new eg.Graphics.SpriteAnimation(knight.Graphic.Image, 18, new eg.Size2d(64, 64), 9, new eg.Vector2d(0, i * 64));
        }

        this._knight.MovementController.OnMove.Bind((moveEvent: eg.MovementControllers.IMoveEvent) => {
            this.KnightMove(moveEvent);
        });

    }

    private KnightMove(moveEvent: eg.MovementControllers.IMoveEvent): void {
        if (moveEvent.StartMoving) {
            this._animations[moveEvent.Direction].Play(true);
        }
        else {
            this._animations[moveEvent.Direction].Stop();
        }
    }

    public Update(gameTime: eg.GameTime): void {
        for (var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
            this._animations[KnightAnimationHandler._animationDirectionMap[i]].Update(gameTime);
        }
    }
}