/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module Shapes {

    export class ShapeAnimator {
        public static AnimationSpeed: number = 50;
        public static RotationSpeed: number = Math.PI / 4;
        public static ChangeDirectionEvery: number = 3000;
        public Direction: number = 1;
        public CurrentAnimations: { [animation: string]: boolean; } = {
            Position: false,
            Rotation: false,
            Size: false,
            Opacity: false
        };
        private _lastChanged: number;

        constructor(shapeAnimators: JQuery, private _defaultPosition: eg.Vector2d, private _defaultSize: eg.Size2d, private _defaultRotation: number, private _defaultOpacity: number, private _syncSliders: Function) {
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

            $.each(shapeAnimators, function (i, btn) {
                $(this).click(animatorClicked);
            });

            this._lastChanged = new Date().getTime();
        }

        public ApplyAnimation(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
            if (gameTime.Now.getTime() - this._lastChanged > ShapeAnimator.ChangeDirectionEvery) {
                this.Direction *= -1;
                this._lastChanged = gameTime.Now.getTime();
            }

            for (var key in this.CurrentAnimations) {
                if (this.CurrentAnimations[key]) {
                    this[key](shape, gameTime);
                    this._syncSliders(key);
                }
            }
        }

        private Position(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
            var incrementor = ShapeAnimator.AnimationSpeed * gameTime.Elapsed.Seconds,
                direction = shape.Position.Subtract(this._defaultPosition).Abs().Sign();

            if (direction.Magnitude() === 0) {
                direction = eg.Vector2d.One;
            }

            shape.Position = shape.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
        }

        private Size(shape: any, gameTime: eg.GameTime): void {
            var incrementor = ShapeAnimator.AnimationSpeed * gameTime.Elapsed.Seconds;

            if (shape._type === "Circle") {
                shape.Radius += this.Direction * incrementor;
            }
            else {
                shape.Size = shape.Size.Add(this.Direction * incrementor);
            }
        }

        private Rotation(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
            var incrementor = ShapeAnimator.RotationSpeed * gameTime.Elapsed.Seconds,
                direction = 1;

            shape.Rotation += direction * this.Direction * incrementor;
        }

        private Opacity(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
            var incrementor = .33 * gameTime.Elapsed.Seconds;

            shape.Opacity = shape.Opacity + incrementor * this.Direction;

            if (shape.Opacity > 1) {
                shape.Opacity = 1;
            }
        }
    }

}