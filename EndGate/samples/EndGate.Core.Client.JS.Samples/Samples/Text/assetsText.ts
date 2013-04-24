/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/jqueryui.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class TextBuilder extends EndGate.Core.Game {
    public Text: EndGate.Core.Graphics.Text.Text2d;

    private _textAnimator: TextAnimator;

    constructor(private _canvas: HTMLCanvasElement, targetAnimators: JQuery, defaultPosition: EndGate.Core.Assets.Vector2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
        super(_canvas);
        var that = this;

        this.Text = new EndGate.Core.Graphics.Text.Text2d(defaultPosition.X, defaultPosition.Y, "Hello World!");
        this.Text.FontSettings.FontSize(20);
        this.Text.FontSettings.FontFamily(EndGate.Core.Graphics.Text.FontFamily.TimesNewRoman);
        this.Scene.Add(this.Text);

        this._textAnimator = new TextAnimator(targetAnimators, defaultPosition, defaultRotation, defaultOpacity, this._syncSliders);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._textAnimator.ApplyAnimation(this.Text, gameTime);
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

class TextAnimator {
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

    constructor(textAnimators: JQuery, private _defaultPosition: EndGate.Core.Assets.Vector2d, private _defaultRotation: number, private _defaultOpacity: number, private _syncSliders: Function) {
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

    public ApplyAnimation(text: EndGate.Core.Graphics.Text.Text2d, gameTime: EndGate.Core.GameTime): void {
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

    private Position(text: EndGate.Core.Graphics.Text.Text2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = TextAnimator.AnimationSpeed * gameTime.ElapsedSecond,
            direction = text.Position.Subtract(this._defaultPosition).Abs().Sign();

        if (direction.Magnitude() === 0) {
            direction = EndGate.Core.Assets.Vector2d.One();
        }

        text.Position = text.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    }

    private Rotation(text: EndGate.Core.Graphics.Text.Text2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = TextAnimator.RotationSpeed * gameTime.ElapsedSecond,
            direction = 1;

        text.Rotation += direction * this.Direction * incrementor;
    }

    private Size(text: EndGate.Core.Graphics.Text.Text2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = (TextAnimator.AnimationSpeed/2) * gameTime.ElapsedSecond;

        text.FontSettings.FontSize(parseFloat(text.FontSettings.FontSize()) + this.Direction * incrementor);
    }

    private Opacity(text: EndGate.Core.Graphics.Text.Text2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = .33 * gameTime.ElapsedSecond;

        text.Opacity(text.Opacity() + incrementor * this.Direction);

        if (text.Opacity() > 1) {
            text.Opacity(1);
        }
    }
}