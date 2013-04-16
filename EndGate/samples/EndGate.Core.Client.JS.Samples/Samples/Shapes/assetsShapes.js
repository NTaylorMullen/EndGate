var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ShapeBuilder = (function (_super) {
    __extends(ShapeBuilder, _super);
    function ShapeBuilder(_canvas, targetBuilders, targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, syncSliders) {
        _super.call(this, _canvas);
        this._canvas = _canvas;
        var that = this, builderClicked = function () {
            targetBuilders.removeClass("disabled");
            $(this).addClass("disabled");
            that.BuildShape($(this)[0]);
        };
        $.each(targetBuilders, function (index, val) {
            $(val).click(builderClicked);
        });
        $(targetBuilders[0]).click();
        this._shapeAnimator = new ShapeAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, syncSliders);
    }
    ShapeBuilder.prototype.Update = function (gameTime) {
        this._shapeAnimator.ApplyAnimation(this.Shape, gameTime);
    };
    ShapeBuilder.prototype.BuildShape = function (builder) {
        var shapeType = EndGate.Core.Graphics.Shapes[$(builder).attr("shape")], newShape;
        if(!this.Shape) {
            newShape = new shapeType(this._canvas.width / 2, this._canvas.height / 2, 200, 200);
        } else {
            newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, this.Shape.Size.Width, this.Shape.Size.Height);
            newShape.Color(this.Shape.Color());
            newShape.Border(this.Shape.BorderThickness(), this.Shape.BorderColor());
            newShape.Shadow(this.Shape.ShadowX(), this.Shape.ShadowY(), this.Shape.ShadowColor(), this.Shape.ShadowBlur());
            newShape.Opacity(this.Shape.Opacity());
            newShape.Rotation = this.Shape.Rotation;
            this.Scene.Remove(this.Shape);
        }
        this.Shape = newShape;
        this.Scene.Add(this.Shape);
    };
    return ShapeBuilder;
})(EndGate.Core.Game);
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
var ShapeAnimator = (function () {
    function ShapeAnimator(shapeAnimators, _defaultPosition, _defaultSize, _defaultRotation, _defaultOpacity, _syncSliders) {
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
        $.each(shapeAnimators, function (i, btn) {
            $(this).click(animatorClicked);
        });
        this._lastChanged = new Date().getTime();
    }
    ShapeAnimator.AnimationSpeed = 50;
    ShapeAnimator.RotationSpeed = Math.PI / 4;
    ShapeAnimator.ChangeDirectionEvery = 3000;
    ShapeAnimator.prototype.ApplyAnimation = function (shape, gameTime) {
        if(gameTime.Now.getTime() - this._lastChanged > ShapeAnimator.ChangeDirectionEvery) {
            this.Direction *= -1;
            this._lastChanged = gameTime.Now.getTime();
            console.log("Changing direction: " + this.Direction);
        }
        for(var key in this.CurrentAnimations) {
            if(this.CurrentAnimations[key]) {
                this[key](shape, gameTime);
                this._syncSliders(key);
            }
        }
    };
    ShapeAnimator.prototype.Position = function (shape, gameTime) {
        var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond, direction = shape.Position.Subtract(this._defaultPosition).Abs().Sign();
        if(direction.Magnitude() === 0) {
            direction = EndGate.Core.Assets.Vector2d.One();
        }
        shape.Position = shape.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    };
    ShapeAnimator.prototype.Size = function (shape, gameTime) {
        var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond, direction = EndGate.Core.Assets.Size2d.One();
        shape.Size = shape.Size.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    };
    ShapeAnimator.prototype.Rotation = function (shape, gameTime) {
        var incrementor = ShapeAnimator.RotationSpeed * gameTime.ElapsedSecond, direction = 1;
        shape.Rotation += direction * this.Direction * incrementor;
    };
    ShapeAnimator.prototype.Opacity = function (shape, gameTime) {
        var incrementor = .33 * gameTime.ElapsedSecond;
        shape.Opacity(shape.Opacity() + incrementor * this.Direction);
        if(shape.Opacity() > 1) {
            shape.Opacity(1);
        }
    };
    return ShapeAnimator;
})();
//@ sourceMappingURL=assetsShapes.js.map
