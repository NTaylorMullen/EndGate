/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/jqueryui.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class SpriteBuilder extends EndGate.Core.Game {
    public Sprite: EndGate.Core.Graphics.Sprites.Sprite2d;

    private _spriteAnimator: SpriteAnimator;

    constructor(private _canvas: HTMLCanvasElement, targetAnimators: JQuery, defaultPosition: EndGate.Core.Assets.Vector2d, defaultSize: EndGate.Core.Assets.Size2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
        super(_canvas);

        this.Sprite = new EndGate.Core.Graphics.Sprites.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new EndGate.Core.Graphics.Sprites.ImageSource("html5-logo.png", 200, 200));
        this._spriteAnimator = new SpriteAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);

        this.Scene.Add(this.Sprite);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._spriteAnimator.ApplyAnimation(this.Sprite, gameTime);
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

class SpriteAnimator {
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

    constructor(spriteAnimators: JQuery, private _defaultPosition: EndGate.Core.Assets.Vector2d, private _defaultSize: EndGate.Core.Assets.Size2d, private _defaultRotation: number, private _defaultOpacity: number, private _syncSliders: Function) {
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

        $.each(spriteAnimators, function (i, btn) {
            $(this).click(animatorClicked);
        });

        this._lastChanged = new Date().getTime();
    }

    public ApplyAnimation(sprite: EndGate.Core.Graphics.Sprites.Sprite2d, gameTime: EndGate.Core.GameTime): void {
        if (gameTime.Now.getTime() - this._lastChanged > SpriteAnimator.ChangeDirectionEvery) {
            this.Direction *= -1;
            this._lastChanged = gameTime.Now.getTime();
            console.log("Changing direction: " + this.Direction);
        }

        for (var key in this.CurrentAnimations) {
            if (this.CurrentAnimations[key]) {
                this[key](sprite, gameTime);
                this._syncSliders(key);
            }
        }
    }

    private Position(sprite: EndGate.Core.Graphics.Sprites.Sprite2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = SpriteAnimator.AnimationSpeed * gameTime.ElapsedSecond,
            direction = sprite.Position.Subtract(this._defaultPosition).Abs().Sign();

        if (direction.Magnitude() === 0) {
            direction = EndGate.Core.Assets.Vector2d.One();
        }

        sprite.Position = sprite.Position.Add(direction.Multiply(this.Direction).Multiply(incrementor));
    }

    private Size(sprite: EndGate.Core.Graphics.Sprites.Sprite2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = SpriteAnimator.AnimationSpeed * gameTime.ElapsedSecond;

        sprite.Size = sprite.Size.Add(this.Direction * incrementor);
    }

    private Rotation(sprite: EndGate.Core.Graphics.Sprites.Sprite2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = SpriteAnimator.RotationSpeed * gameTime.ElapsedSecond,
            direction = 1;

        sprite.Rotation += direction * this.Direction * incrementor;
    }

    private Opacity(sprite: EndGate.Core.Graphics.Sprites.Sprite2d, gameTime: EndGate.Core.GameTime): void {
        var incrementor = .33 * gameTime.ElapsedSecond;

        sprite.Opacity(sprite.Opacity() + incrementor * this.Direction);

        if (sprite.Opacity() > 1) {
            sprite.Opacity(1);
        }
    }
}