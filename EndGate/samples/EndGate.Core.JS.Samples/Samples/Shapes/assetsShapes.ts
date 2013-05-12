/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class ShapeBuilder extends eg.Game {
    public Shape: any;

    private _shapeAnimator: ShapeAnimator;

    constructor(private _canvas: HTMLCanvasElement, targetBuilders: JQuery, targetAnimators: JQuery, defaultPosition: eg.Vector2d, defaultSize: eg.Size2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
        super(_canvas);
        var that = this,
            builderClicked = function () {
                if (!$(this).hasClass("disabled")) {
                    targetBuilders.removeClass("disabled");
                    $(this).addClass("disabled");
                    that.BuildShape($(this)[0]);
                }
            };

        $.each(targetBuilders, function (index, val) {
            $(val).click(builderClicked);
        });

        $(targetBuilders[0]).click();

        this._shapeAnimator = new ShapeAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);
    }

    public Update(gameTime: eg.GameTime): void {
        this._shapeAnimator.ApplyAnimation(this.Shape, gameTime);
    }

    private BuildShape(builder: HTMLElement): void {
        var shapeTypeName = $(builder).attr("shape"),
            shapeType = eg.Graphics[shapeTypeName],
            newShape: eg.Graphics.Abstractions.Shape;

        // If there is no current shape
        if (!this.Shape) {
            newShape = new shapeType(this._canvas.width / 2, this._canvas.height / 2, 200, 200);
        }
        else {
            if (shapeTypeName !== "Circle") {
                newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, (<any>this.Shape).Radius * 2, (<any>this.Shape).Radius * 2);
            }
            else {
                newShape = new shapeType(this.Shape.Position.X, this.Shape.Position.Y, Math.min((<any>this.Shape).Size.Width, (<any>this.Shape).Size.Height) / 2);
                window.setTimeout((function (sizeSync) {
                    return function () {
                        sizeSync("Size");
                    };
                })(this._syncSliders), 0);
            }
            newShape.Color(this.Shape.Color());
            newShape.Border(this.Shape.BorderThickness(), this.Shape.BorderColor());
            newShape.Shadow(this.Shape.ShadowX(), this.Shape.ShadowY(), this.Shape.ShadowColor(), this.Shape.ShadowBlur());
            newShape.Opacity(this.Shape.Opacity());
            newShape.Rotation = this.Shape.Rotation;
            this.Scene.Remove(this.Shape);
        }

        this.Shape = newShape;
        this.Scene.Add(this.Shape);
    }
}

class ColorPicker {
    private sliders: any[];

    constructor(private red: any, private green: any, private blue: any, defaultColor: number[], private oncolorchange: Function) {
        var updateGraphic = () => {
            this.UpdateColor();
        };

        this.sliders = [this.red, this.green, this.blue];

        for (var i = 0; i < 3; i++) {
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

    private UpdateColor(): void {
        var red = this.red.slider("value"),
            green = this.green.slider("value"),
            blue = this.blue.slider("value");

        this.oncolorchange("rgb(" + red + ", " + green + ", " + blue + ")")
    }
}

class CustomSlider {

    constructor(private _target: any, private _min: number, private _max: number, private _defaultValue: number, private onsliderchange: Function) {
        var sliderChange = () => {
            this.SliderChange();
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

    public UpdateSlider(val: number): void {
        this._target.slider("value", val);
    }

    private SliderChange(): void {
        this.onsliderchange(parseInt(this._target.slider("value")));
    }
}

class ShapeAnimator {
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
            console.log("Changing direction: " + this.Direction);
        }

        for (var key in this.CurrentAnimations) {
            if (this.CurrentAnimations[key]) {
                this[key](shape, gameTime);
                this._syncSliders(key);
            }
        }            
    }

    private Position(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
        var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond,
            direction = shape.Position.Subtract(this._defaultPosition).Abs().Sign();

        if (direction.Magnitude() === 0) {
            direction = eg.Vector2d.One();
        }

        shape.Position = shape.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    }

    private Size(shape: any, gameTime: eg.GameTime): void {
        var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond;

        if (shape._type === "Circle") {
            shape.Radius += this.Direction * incrementor;
        }
        else {
            shape.Size = shape.Size.Add(this.Direction * incrementor);
        }
    }

    private Rotation(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
        var incrementor = ShapeAnimator.RotationSpeed * gameTime.ElapsedSecond,
            direction = 1;

        shape.Rotation += direction * this.Direction * incrementor;
    }

    private Opacity(shape: eg.Graphics.Abstractions.Shape, gameTime: eg.GameTime): void {
        var incrementor = .33 * gameTime.ElapsedSecond;

        shape.Opacity(shape.Opacity() + incrementor * this.Direction);

        if (shape.Opacity() > 1) {
            shape.Opacity(1);
        }
    }
}