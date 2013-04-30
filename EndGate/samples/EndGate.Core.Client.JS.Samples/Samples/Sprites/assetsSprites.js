var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SpriteBuilder = (function (_super) {
    __extends(SpriteBuilder, _super);
    function SpriteBuilder(_canvas, targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, _syncSliders) {
        _super.call(this, _canvas);
        this._canvas = _canvas;
        this._syncSliders = _syncSliders;
        this.Sprite = new eg.Graphics.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new eg.Graphics.Assets.ImageSource("html5-logo.png", 200, 200));
        this._spriteAnimator = new SpriteAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);
        this.Scene.Add(this.Sprite);
    }
    SpriteBuilder.prototype.Update = function (gameTime) {
        this._spriteAnimator.ApplyAnimation(this.Sprite, gameTime);
    };
    return SpriteBuilder;
})(eg.Game);
var CustomSlider = (function () {
    function CustomSlider(_target, _min, _max, _defaultValue, onsliderchange) {
        this._target = _target;
        this._min = _min;
        this._max = _max;
        this._defaultValue = _defaultValue;
        this.onsliderchange = onsliderchange;
        var _this = this;
        var sliderChange = function () {
            _this.SliderChange();
        };
        this._target.slider({
            orientation: "horizontal",
            range: "min",
            min: this._min,
            max: this._max,
            value: this._defaultValue,
            animate: true,
            slide: sliderChange,
            change: sliderChange
        });
        this.SliderChange();
    }
    CustomSlider.prototype.UpdateSlider = function (val) {
        this._target.slider("value", val);
    };
    CustomSlider.prototype.SliderChange = function () {
        this.onsliderchange(parseInt(this._target.slider("value")));
    };
    return CustomSlider;
})();
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
            if($this.hasClass("btn-success")) {
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
    SpriteAnimator.AnimationSpeed = 50;
    SpriteAnimator.RotationSpeed = Math.PI / 4;
    SpriteAnimator.ChangeDirectionEvery = 3000;
    SpriteAnimator.prototype.ApplyAnimation = function (sprite, gameTime) {
        if(gameTime.Now.getTime() - this._lastChanged > SpriteAnimator.ChangeDirectionEvery) {
            this.Direction *= -1;
            this._lastChanged = gameTime.Now.getTime();
            console.log("Changing direction: " + this.Direction);
        }
        for(var key in this.CurrentAnimations) {
            if(this.CurrentAnimations[key]) {
                this[key](sprite, gameTime);
                this._syncSliders(key);
            }
        }
    };
    SpriteAnimator.prototype.Position = function (sprite, gameTime) {
        var incrementor = SpriteAnimator.AnimationSpeed * gameTime.ElapsedSecond, direction = sprite.Position.Subtract(this._defaultPosition).Abs().Sign();
        if(direction.Magnitude() === 0) {
            direction = eg.Vector2d.One();
        }
        sprite.Position = sprite.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    };
    SpriteAnimator.prototype.Size = function (sprite, gameTime) {
        var incrementor = SpriteAnimator.AnimationSpeed * gameTime.ElapsedSecond;
        sprite.Size = sprite.Size.Add(this.Direction * incrementor);
    };
    SpriteAnimator.prototype.Rotation = function (sprite, gameTime) {
        var incrementor = SpriteAnimator.RotationSpeed * gameTime.ElapsedSecond, direction = 1;
        sprite.Rotation += direction * this.Direction * incrementor;
    };
    SpriteAnimator.prototype.Opacity = function (sprite, gameTime) {
        var incrementor = .33 * gameTime.ElapsedSecond;
        sprite.Opacity(sprite.Opacity() + incrementor * this.Direction);
        if(sprite.Opacity() > 1) {
            sprite.Opacity(1);
        }
    };
    return SpriteAnimator;
})();
//@ sourceMappingURL=assetsSprites.js.map
