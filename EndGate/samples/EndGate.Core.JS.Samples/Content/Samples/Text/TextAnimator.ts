/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
module Texts {

    export class TextAnimator {
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

        constructor(textAnimators: JQuery, private _defaultPosition: eg.Vector2d, private _defaultRotation: number, private _defaultOpacity: number, private _syncSliders: Function) {
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

            $.each(textAnimators, function (i, btn) {
                $(this).click(animatorClicked);
            });

            this._lastChanged = new Date().getTime();
        }

        public ApplyAnimation(text: eg.Graphics.Text2d, gameTime: eg.GameTime): void {
            if (gameTime.Now.getTime() - this._lastChanged > TextAnimator.ChangeDirectionEvery) {
                this.Direction *= -1;
                this._lastChanged = gameTime.Now.getTime();
            }

            for (var key in this.CurrentAnimations) {
                if (this.CurrentAnimations[key]) {
                    this[key](text, gameTime);
                    this._syncSliders(key);
                }
            }
        }

        private Position(text: eg.Graphics.Text2d, gameTime: eg.GameTime): void {
            var incrementor = TextAnimator.AnimationSpeed * gameTime.ElapsedSecond,
                direction = text.Position.Subtract(this._defaultPosition).Abs().Sign();

            if (direction.Magnitude() === 0) {
                direction = eg.Vector2d.One;
            }

            text.Position = text.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
        }

        private Rotation(text: eg.Graphics.Text2d, gameTime: eg.GameTime): void {
            var incrementor = TextAnimator.RotationSpeed * gameTime.ElapsedSecond,
                direction = 1;

            text.Rotation += direction * this.Direction * incrementor;
        }

        private Size(text: eg.Graphics.Text2d, gameTime: eg.GameTime): void {
            var incrementor = (TextAnimator.AnimationSpeed / 2) * gameTime.ElapsedSecond;

            text.FontSettings().FontSize(parseFloat(text.FontSettings().FontSize()) + this.Direction * incrementor);
        }

        private Opacity(text: eg.Graphics.Text2d, gameTime: eg.GameTime): void {
            var incrementor = .33 * gameTime.ElapsedSecond;

            text.Opacity(text.Opacity() + incrementor * this.Direction);

            if (text.Opacity() > 1) {
                text.Opacity(1);
            }
        }
    }

}