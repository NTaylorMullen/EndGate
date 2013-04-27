/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class FireExplosion implements EndGate.Core.IUpdateable {
    public Graphic: EndGate.Core.Graphics.Sprites.Sprite2d;

    private _explosionSpriteSheet: EndGate.Core.Graphics.Sprites.ImageSource;
    private _explosionAnimation: EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation;
    private _explosionSprite: EndGate.Core.Graphics.Sprites.Sprite2d;

    constructor(x: number, y: number, onComplete: Function) {
        this._explosionSpriteSheet = new EndGate.Core.Graphics.Sprites.ImageSource("images/fire_explosion.png", 1152, 128,0,0);
        this._explosionAnimation = new EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation(this._explosionSpriteSheet, 18, new EndGate.Core.Assets.Size2d(128, 128), 9);
        this._explosionSprite = new EndGate.Core.Graphics.Sprites.Sprite2d(x, y, this._explosionSpriteSheet, 128, 128);
        this._explosionAnimation.OnComplete.Bind(onComplete);

        this._explosionSprite.Rotation = Math.random() * (<any>Math).twoPI + -Math.PI;
        this.Graphic = this._explosionSprite;
        this._explosionAnimation.Play();
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._explosionAnimation.Update(gameTime);
    }
}

class FireExplosionManager implements EndGate.Core.IUpdateable {
    private _explosions: { [id: number]: FireExplosion; };
    private _explosionIds: number = 0;

    constructor(private _mouse: EndGate.Core.Input.Mouse.MouseHandler, private _scene: EndGate.Core.Rendering.Scene2d) {
        var that = this;

        this._explosions = <any>{};

        this._mouse.OnClick.Bind((event: EndGate.Core.Input.Mouse.IMouseClickEvent) => {
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

    public Update(gameTime: EndGate.Core.GameTime): void {
        for (var id in this._explosions) {
            this._explosions[id].Update(gameTime);
        }
    }
}

class RPG extends EndGate.Core.Game {
    private _fireExplosionManager: FireExplosionManager;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        
        this._fireExplosionManager = new FireExplosionManager(this.Input.Mouse, this.Scene);
    }

    public Update(gameTime: EndGate.Core.GameTime): void {
        this._fireExplosionManager.Update(gameTime);
    }
}