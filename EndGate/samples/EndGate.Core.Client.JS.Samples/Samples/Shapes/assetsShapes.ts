/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/jqueryui.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class ShapeBuilder extends EndGate.Core.Game {
    public Shape: any;

    private _shapeAnimator: ShapeAnimator;

    constructor(private _canvas: HTMLCanvasElement, targetBuilders: JQuery, targetAnimators: JQuery, defaultPosition: EndGate.Core.Assets.Vector2d, defaultSize: EndGate.Core.Assets.Size2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
        super(_canvas);
        var that = this,
            builderClicked = function () {
                targetBuilders.removeClass("disabled");
                $(this).addClass("disabled");
                that.BuildShape($(this)[0]);
            };

        $.each(targetBuilders, function (index, val) {
            $(val).click(builderClicked);
        });

        $(targetBuilders[0]).click();

        this._shapeAnimator = new ShapeAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._shapeAnimator.ApplyAnimation(this.Shape, gameTime);
    }

    private BuildShape(builder: HTMLElement): void {
        var shapeTypeName = $(builder).attr("shape"),
            shapeType = EndGate.Core.Graphics.Shapes[shapeTypeName],
            newShape: EndGate.Core.Graphics.Shapes.Shape;

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

    constructor(shapeAnimators: JQuery, private _defaultPosition: EndGate.Core.Assets.Vector2d, private _defaultSize: EndGate.Core.Assets.Size2d, private _defaultRotation: number, private _defaultOpacity: number, private _syncSliders: Function) {
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

    public ApplyAnimation(shape: EndGate.Core.Graphics.Shapes.Shape, gameTime: EndGate.Core.GameTime): void {
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

    private Position(shape: EndGate.Core.Graphics.Shapes.Shape, gameTime: EndGate.Core.GameTime): void {
        var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond,
            direction = shape.Position.Subtract(this._defaultPosition).Abs().Sign();

        if (direction.Magnitude() === 0) {
            direction = EndGate.Core.Assets.Vector2d.One();
        }

        shape.Position = shape.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    }

    private Size(shape: any, gameTime: EndGate.Core.GameTime): void {
        var incrementor = ShapeAnimator.AnimationSpeed * gameTime.ElapsedSecond;

        if (shape._type === "Circle") {
            shape.Radius += this.Direction * incrementor;
        }
        else {
            shape.Size = shape.Size.Add(this.Direction * incrementor);
        }
    }

    private Rotation(shape: EndGate.Core.Graphics.Shapes.Shape, gameTime: EndGate.Core.GameTime): void {
        var incrementor = ShapeAnimator.RotationSpeed * gameTime.ElapsedSecond,
            direction = 1;

        shape.Rotation += direction * this.Direction * incrementor;
    }

    private Opacity(shape: EndGate.Core.Graphics.Shapes.Shape, gameTime: EndGate.Core.GameTime): void {
        var incrementor = .33 * gameTime.ElapsedSecond;

        shape.Opacity(shape.Opacity() + incrementor * this.Direction);

        if (shape.Opacity() > 1) {
            shape.Opacity(1);
        }
    }
}