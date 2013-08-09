/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var Sprites;
(function (Sprites) {
    var SpriteAnimator = (function () {
        function SpriteAnimator(spriteAnimators, _defaultPosition, _defaultSize, _defaultRotation, _defaultOpacity, _syncSliders) {
            this._defaultPosition = _defaultPosition;
            this._defaultSize = _defaultSize;
            this._defaultRotation = _defaultRotation;
            this._defaultOpacity = _defaultOpacity;
            this._syncSliders = _syncSliders;
            this.Direction = 1;
            this.CurrentAnimations = {
                Position: false,
                Rotation: false,
                Size: false,
                Opacity: false
            };
            var that = this, animatorClicked = function () {
                var $this = $(this), animation = $this.attr("animation");

                if ($this.hasClass("btn-success")) {
                    that.CurrentAnimations[animation] = false;
                    $this.removeClass("btn-success");
                } else {
                    that.CurrentAnimations[animation] = true;
                    $this.addClass("btn-success");
                }
            };

            $.each(spriteAnimators, function (i, btn) {
                $(this).click(animatorClicked);
            });

            this._lastChanged = new Date().getTime();
        }
        SpriteAnimator.prototype.ApplyAnimation = function (sprite, gameTime) {
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
        };

        SpriteAnimator.prototype.Position = function (sprite, gameTime) {
            var incrementor = SpriteAnimator.AnimationSpeed * gameTime.Elapsed.Seconds, direction = sprite.Position.Subtract(this._defaultPosition).Abs().Sign();

            if (direction.Magnitude() === 0) {
                direction = eg.Vector2d.One;
            }

            sprite.Position = sprite.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
        };

        SpriteAnimator.prototype.Size = function (sprite, gameTime) {
            var incrementor = SpriteAnimator.AnimationSpeed * gameTime.Elapsed.Seconds;

            sprite.Size = sprite.Size.Add(this.Direction * incrementor);
        };

        SpriteAnimator.prototype.Rotation = function (sprite, gameTime) {
            var incrementor = SpriteAnimator.RotationSpeed * gameTime.Elapsed.Seconds, direction = 1;

            sprite.Rotation += direction * this.Direction * incrementor;
        };

        SpriteAnimator.prototype.Opacity = function (sprite, gameTime) {
            var incrementor = .33 * gameTime.Elapsed.Seconds;

            sprite.Opacity += incrementor * this.Direction;

            if (sprite.Opacity > 1) {
                sprite.Opacity = 1;
            }
        };
        SpriteAnimator.AnimationSpeed = 50;
        SpriteAnimator.RotationSpeed = Math.PI / 4;
        SpriteAnimator.ChangeDirectionEvery = 3000;
        return SpriteAnimator;
    })();
    Sprites.SpriteAnimator = SpriteAnimator;
})(Sprites || (Sprites = {}));
//# sourceMappingURL=SpriteAnimator.js.map
