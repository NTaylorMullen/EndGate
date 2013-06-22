/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
var Texts;
(function (Texts) {
    var TextAnimator = (function () {
        function TextAnimator(textAnimators, _defaultPosition, _defaultRotation, _defaultOpacity, _syncSliders) {
            this._defaultPosition = _defaultPosition;
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

            $.each(textAnimators, function (i, btn) {
                $(this).click(animatorClicked);
            });

            this._lastChanged = new Date().getTime();
        }
        TextAnimator.prototype.ApplyAnimation = function (text, gameTime) {
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
        };

        TextAnimator.prototype.Position = function (text, gameTime) {
            var incrementor = TextAnimator.AnimationSpeed * gameTime.ElapsedSecond, direction = text.Position.Subtract(this._defaultPosition).Abs().Sign();

            if (direction.Magnitude() === 0) {
                direction = eg.Vector2d.One;
            }

            text.Position = text.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
        };

        TextAnimator.prototype.Rotation = function (text, gameTime) {
            var incrementor = TextAnimator.RotationSpeed * gameTime.ElapsedSecond, direction = 1;

            text.Rotation += direction * this.Direction * incrementor;
        };

        TextAnimator.prototype.Size = function (text, gameTime) {
            var incrementor = (TextAnimator.AnimationSpeed / 2) * gameTime.ElapsedSecond;

            text.FontSettings().FontSize(parseFloat(text.FontSettings().FontSize()) + this.Direction * incrementor);
        };

        TextAnimator.prototype.Opacity = function (text, gameTime) {
            var incrementor = .33 * gameTime.ElapsedSecond;

            text.Opacity(text.Opacity() + incrementor * this.Direction);

            if (text.Opacity() > 1) {
                text.Opacity(1);
            }
        };
        TextAnimator.AnimationSpeed = 50;
        TextAnimator.RotationSpeed = Math.PI / 4;
        TextAnimator.ChangeDirectionEvery = 3000;
        return TextAnimator;
    })();
    Texts.TextAnimator = TextAnimator;
})(Texts || (Texts = {}));
//@ sourceMappingURL=TextAnimator.js.map
