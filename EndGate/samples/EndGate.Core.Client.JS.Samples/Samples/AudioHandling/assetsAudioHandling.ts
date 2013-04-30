/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

// Generic animation class that allows me to display temporary animations in the viewport
class Animation {
    public Graphic: eg.Graphics.Sprite2d;

    private _spriteSheet: eg.Graphics.Assets.ImageSource;
    private _animation: eg.Graphics.SpriteAnimation;
    private _sprite: eg.Graphics.Sprite2d;

    constructor(imageLocation: string, x: number, y: number, spriteSheetWidth: number, spriteSheetHeight: number, frameWidth: number, frameHeight: number, fps: number, frameCount: number, onComplete: Function, repeat?: bool = true, rotateRandomly?: bool = false) {
        this._spriteSheet = new eg.Graphics.Assets.ImageSource(imageLocation, spriteSheetWidth, spriteSheetHeight, 0, 0);
        this._animation = new eg.Graphics.SpriteAnimation(this._spriteSheet, fps, new eg.Size2d(frameWidth, frameHeight), frameCount);
        this._sprite = new eg.Graphics.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);
        this._animation.OnComplete.Bind(onComplete);

        if (rotateRandomly) {
            this._sprite.Rotation = Math.random() * (<any>Math).twoPI + -Math.PI;
        }

        this.Graphic = this._sprite;
        this._animation.Play(repeat);
    }

    public Update(gameTime: eg.GameTime): void {
        this._animation.Update(gameTime);
    }
}

class BurningFlame implements eg.IUpdateable extends Animation {
    constructor(x: number, y: number) {
        super("images/burning_flame.png", x, y, 768, 128, 128, 128, 16, 6, () => { });
    }
}

class SmokePoof implements eg.IUpdateable extends Animation {
    constructor(x: number, y: number, onComplete: Function) {
        super("images/smoke_poof.png", x, y, 1280, 128, 128, 128, 20, 10, onComplete, false, true);
    }
}

class SmokePoofManager implements eg.IUpdateable {
    private _smokePoofs: { [id: number]: SmokePoof; };
    private _smokePoofIds: number = 0;

    constructor(private _mouse: eg.Input.MouseHandler, private _scene: eg.Rendering.Scene2d, private _onClickSound: eg.Sound.AudioPlayer) {
        var that = this;

        this._smokePoofs = <any>{};

        this._mouse.OnClick.Bind((event: eg.Input.IMouseClickEvent) => {
            var smokePoofId = that._smokePoofIds++,
                smokePoof;
            smokePoof = new SmokePoof(event.Position.X, event.Position.Y, () => {
                delete that._smokePoofs[smokePoofId];
                that._scene.Remove(smokePoof.Graphic);
            });

            this._onClickSound.Play().Seek(.1);
            that._smokePoofs[smokePoofId] = smokePoof;
            that._scene.Add(smokePoof.Graphic);
        });
    }

    public Update(gameTime: eg.GameTime): void {
        for (var id in this._smokePoofs) {
            this._smokePoofs[id].Update(gameTime);
        }
    }
}

class AudioHandler extends eg.Game {
    private _burningFlame: BurningFlame;
    private _burningSound: eg.Sound.AudioClip;
    private _smokePoofManager: SmokePoofManager;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._burningFlame = new BurningFlame(canvas.width / 2, canvas.height / 2);        
        this.Scene.Add(this._burningFlame.Graphic);

        this.Audio.Load("burning", ["sounds/fireburning.ogg", "sounds/fireburning.mp3"]);
        this._smokePoofManager = new SmokePoofManager(this.Input.Mouse, this.Scene, this.Audio.Load("poof", ["sounds/smokepoof.ogg", "sounds/smokepoof.mp3"]));

        this._burningSound = this.Audio.Play("burning", new eg.Sound.AudioSettings(true, 75));
    }

    public Update(gameTime: eg.GameTime): void {
        this._burningFlame.Update(gameTime);
        this._smokePoofManager.Update(gameTime);
    }
}