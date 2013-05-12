/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

// Generic animation class that allows me to display temporary animations in the viewport
class Animation {
    public Graphic: eg.Graphics.Sprite2d;

    private _spriteSheet: eg.Graphics.Assets.ImageSource;
    private _animation: eg.Graphics.SpriteAnimation;
    private _sprite: eg.Graphics.Sprite2d;

    constructor(imageLocation: string, x: number, y: number, spriteSheetWidth: number, spriteSheetHeight: number, frameWidth: number, frameHeight: number, fps: number, frameCount: number,  onComplete: Function) {
        this._spriteSheet = new eg.Graphics.Assets.ImageSource(imageLocation, spriteSheetWidth, spriteSheetHeight, 0, 0);
        this._animation = new eg.Graphics.SpriteAnimation(this._spriteSheet, fps, new eg.Size2d(frameWidth, frameHeight), frameCount);
        this._sprite = new eg.Graphics.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);
        this._animation.OnComplete.Bind(onComplete);

        this._sprite.Rotation = Math.random() * (<any>Math).twoPI + -Math.PI;
        this.Graphic = this._sprite;
        this._animation.Play();
    }

    public Update(gameTime: eg.GameTime): void {
        this._animation.Update(gameTime);
    }
}

class FireExplosion implements eg.IUpdateable extends Animation {
    constructor(x: number, y: number, onComplete: Function) {
        super("images/fire_explosion.png", x, y, 1152, 128, 128, 128, 18, 9, onComplete);        
    }
}

class ElectricPulse implements eg.IUpdateable extends Animation {
    constructor(x: number, y: number, onComplete: Function) {
        super("images/electric_pulse.png", x, y, 1152, 128, 128, 128, 20, 10, onComplete);
    }
}

class FireExplosionManager implements eg.IUpdateable {
    private _explosions: { [id: number]: FireExplosion; };
    private _explosionIds: number = 0;

    constructor(private _mouse: eg.Input.MouseHandler, private _scene: eg.Rendering.Scene2d) {
        var that = this;

        this._explosions = <any>{};

        this._mouse.OnClick.Bind((event: eg.Input.IMouseClickEvent) => {
            var explosionId = that._explosionIds++,
                explosion;
            explosion = new FireExplosion(event.Position.X, event.Position.Y, () => {
                delete that._explosions[explosionId];
                that._scene.Remove(explosion.Graphic);
            });

            that._explosions[explosionId] = explosion;
            that._scene.Add(explosion.Graphic);
        });
    }

    public Update(gameTime: eg.GameTime): void {
        for (var id in this._explosions) {
            this._explosions[id].Update(gameTime);
        }
    }
}

class ElectricPulseManager {
    private _electricPulses: { [id: number]: FireExplosion; };
    private _electricPulseIds: number = 0;
    // Pulse every 100 ms
    private _pulseFrequency: number = 100;
    private _lastPulse: number = 0;

    constructor(private _mouse: eg.Input.MouseHandler, private _scene: eg.Rendering.Scene2d) {
        var that = this;

        this._electricPulses = <any>{};

        this._mouse.OnMove.Bind((event: eg.Input.IMouseEvent) => {
            var electricPulseId,
                electricPulse,
                now = new Date().getTime();

            if (now - that._lastPulse >= that._pulseFrequency) {
                that._lastPulse = now;

                electricPulseId = that._electricPulseIds++;

                electricPulse = new ElectricPulse(event.Position.X, event.Position.Y, () => {
                    delete that._electricPulses[electricPulseId];
                    that._scene.Remove(electricPulse.Graphic);
                });

                that._electricPulses[electricPulseId] = electricPulse;
                that._scene.Add(electricPulse.Graphic);
            }
        });
    }

    public Update(gameTime: eg.GameTime): void {
        for (var id in this._electricPulses) {
            this._electricPulses[id].Update(gameTime);
        }
    }
}

class Animator extends eg.Game {
    private _fireExplosionManager: FireExplosionManager;
    private _electricPulseManager: ElectricPulseManager;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        
        this._fireExplosionManager = new FireExplosionManager(this.Input.Mouse, this.Scene);
        this._electricPulseManager = new ElectricPulseManager(this.Input.Mouse, this.Scene);
    }

    public Update(gameTime: eg.GameTime): void {
        this._fireExplosionManager.Update(gameTime);
        this._electricPulseManager.Update(gameTime);
    }
}