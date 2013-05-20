/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

class SpriteGame extends eg.Game {
    public Sprite: eg.Graphics.Sprite2d;

    private _spriteAnimator: SpriteAnimator;

    constructor(private _canvas: HTMLCanvasElement, targetAnimators: JQuery, defaultPosition: eg.Vector2d, defaultSize: eg.Size2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
        super(_canvas);

        this.Sprite = new eg.Graphics.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new eg.Graphics.Assets.ImageSource("html5-logo.png", 200, 200));
        this._spriteAnimator = new SpriteAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);

        this.Scene.Add(this.Sprite);
    }

    public Update(gameTime: eg.GameTime): void {
        this._spriteAnimator.ApplyAnimation(this.Sprite, gameTime);
    }
}