/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Sprites {

    export class SpriteAnimator {
        public static AnimationSpeed: number = 50;
        public static RotationSpeed: number = Math.PI / 4;
        public static ChangeDirectionEvery: number = 3000;
        public Direction: number = 1;
        public CurrentAnimations: { [animation: string]: bool; } = {
            Position: false,
            Rotation: false,
            Size: false,
            Opacity: false
        };
        private _lastChanged: number;

        constructor(spriteAnimators: JQuery, private _defaultPosition: eg.Vector2d, private _defaultSize: eg.Size2d, private _defaultRotation: number, private _defaultOpacity: number, private _syncSliders: Function) {
            var that = this,
                animatorClicked = function () {
                    var $this = $(this),
                        animation = $this.attr("animation");

                    if ($this.hasClass("btn-success")) {
                        that.CurrentAnimations[animation] = false;
                        $this.removeClass("btn-success");
                    }
                    else {
                        that.CurrentAnimations[animation] = true;
                        $this.addClass("btn-success");
                    }
                };

            $.each(spriteAnimators, function (i, btn) {
                $(this).click(animatorClicked);
            });

            this._lastChanged = new Date().getTime();
        }

        public ApplyAnimation(sprite: eg.Graphics.Sprite2d, gameTime: eg.GameTime): void {
            if (gameTime.Now.getTime() - this._lastChanged > SpriteAnimator.ChangeDirectionEvery) {
                this.Direction *= -1;
                this._lastChanged = gameTime.Now.getTime();
            }

            for (var key in this.CurrentAnimations) {
                if (this.CurrentAnimations[key]) {
                    this[key](sprite, gameTime);
                    this._syncSliders(key);
                }
            }
        }

        private Position(sprite: eg.Graphics.Sprite2d, gameTime: eg.GameTime): void {
            var incrementor = SpriteAnimator.AnimationSpeed * gameTime.ElapsedSecond,
                direction = sprite.Position.Subtract(this._defaultPosition).Abs().Sign();

            if (direction.Magnitude() === 0) {
                direction = eg.Vector2d.One();
            }

            sprite.Position = sprite.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
        }

        private Size(sprite: eg.Graphics.Sprite2d, gameTime: eg.GameTime): void {
            var incrementor = SpriteAnimator.AnimationSpeed * gameTime.ElapsedSecond;

            sprite.Size = sprite.Size.Add(this.Direction * incrementor);
        }

        private Rotation(sprite: eg.Graphics.Sprite2d, gameTime: eg.GameTime): void {
            var incrementor = SpriteAnimator.RotationSpeed * gameTime.ElapsedSecond,
                direction = 1;

            sprite.Rotation += direction * this.Direction * incrementor;
        }

        private Opacity(sprite: eg.Graphics.Sprite2d, gameTime: eg.GameTime): void {
            var incrementor = .33 * gameTime.ElapsedSecond;

            sprite.Opacity(sprite.Opacity() + incrementor * this.Direction);

            if (sprite.Opacity() > 1) {
                sprite.Opacity(1);
            }
        }
    }

}