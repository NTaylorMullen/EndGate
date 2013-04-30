var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TextBuilder = (function (_super) {
    __extends(TextBuilder, _super);
    function TextBuilder(_canvas, targetAnimators, defaultPosition, defaultRotation, defaultOpacity, _syncSliders) {
        _super.call(this, _canvas);
        this._canvas = _canvas;
        this._syncSliders = _syncSliders;
        var that = this;
        this.Text = new eg.Graphics.Text2d(defaultPosition.X, defaultPosition.Y, "Hello World!");
        this.Text.FontSettings.FontSize(20);
        this.Text.FontSettings.FontFamily(eg.Graphics.Assets.FontFamily.TimesNewRoman);
        this.Scene.Add(this.Text);
        this._textAnimator = new TextAnimator(targetAnimators, defaultPosition, defaultRotation, defaultOpacity, this._syncSliders);
    }
    TextBuilder.prototype.Update = function (gameTime) {
        this._textAnimator.ApplyAnimation(this.Text, gameTime);
    };
    return TextBuilder;
})(eg.Game);
var ColorPicker = (function () {
    function ColorPicker(red, green, blue, defaultColor, oncolorchange) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.oncolorchange = oncolorchange;
        var _this = this;
        var updateGraphic = function () {
            _this.UpdateColor();
        };
        this.sliders = [
            this.red, 
            this.green, 
            this.blue
        ];
        for(var i = 0; i < 3; i++) {
            this.sliders[i].slider({
                orientation: "horizontal",
                range: "min",
                max: 255,
                value: defaultColor[i],
                animate: true,
                slide: updateGraphic,
                change: updateGraphic
            });
        }
        this.UpdateColor();
    }
    ColorPicker.prototype.UpdateColor = function () {
        var red = this.red.slider("value"), green = this.green.slider("value"), blue = this.blue.slider("value");
        this.oncolorchange("rgb(" + red + ", " + green + ", " + blue + ")");
    };
    return ColorPicker;
})();
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
            if($this.hasClass("btn-success")) {
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
    TextAnimator.AnimationSpeed = 50;
    TextAnimator.RotationSpeed = Math.PI / 4;
    TextAnimator.ChangeDirectionEvery = 3000;
    TextAnimator.prototype.ApplyAnimation = function (text, gameTime) {
        if(gameTime.Now.getTime() - this._lastChanged > TextAnimator.ChangeDirectionEvery) {
            this.Direction *= -1;
            this._lastChanged = gameTime.Now.getTime();
        }
        for(var key in this.CurrentAnimations) {
            if(this.CurrentAnimations[key]) {
                this[key](text, gameTime);
                this._syncSliders(key);
            }
        }
    };
    TextAnimator.prototype.Position = function (text, gameTime) {
        var incrementor = TextAnimator.AnimationSpeed * gameTime.ElapsedSecond, direction = text.Position.Subtract(this._defaultPosition).Abs().Sign();
        if(direction.Magnitude() === 0) {
            direction = eg.Vector2d.One();
        }
        text.Position = text.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    };
    TextAnimator.prototype.Rotation = function (text, gameTime) {
        var incrementor = TextAnimator.RotationSpeed * gameTime.ElapsedSecond, direction = 1;
        text.Rotation += direction * this.Direction * incrementor;
    };
    TextAnimator.prototype.Size = function (text, gameTime) {
        var incrementor = (TextAnimator.AnimationSpeed / 2) * gameTime.ElapsedSecond;
        text.FontSettings.FontSize(parseFloat(text.FontSettings.FontSize()) + this.Direction * incrementor);
    };
    TextAnimator.prototype.Opacity = function (text, gameTime) {
        var incrementor = .33 * gameTime.ElapsedSecond;
        text.Opacity(text.Opacity() + incrementor * this.Direction);
        if(text.Opacity() > 1) {
            text.Opacity(1);
        }
    };
    return TextAnimator;
})();
//@ sourceMappingURL=assetsText.js.map
