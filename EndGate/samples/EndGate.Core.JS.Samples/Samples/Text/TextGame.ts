/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="TextAnimator.ts" />

class TextGame extends eg.Game {
    public Text: eg.Graphics.Text2d;

    private _textAnimator: TextAnimator;

    constructor(private _canvas: HTMLCanvasElement, targetAnimators: JQuery, defaultPosition: eg.Vector2d, defaultRotation: number, defaultOpacity: number, private _syncSliders: Function) {
        super(_canvas);
        var that = this;

        this.Text = new eg.Graphics.Text2d(defaultPosition.X, defaultPosition.Y, "Hello World!");
        this.Text.FontSettings.FontSize(20);
        this.Text.FontSettings.FontFamily(eg.Graphics.Assets.FontFamily.TimesNewRoman);
        this.Scene.Add(this.Text);

        this._textAnimator = new TextAnimator(targetAnimators, defaultPosition, defaultRotation, defaultOpacity, this._syncSliders);
    }

    public Update(gameTime: eg.GameTime): void {
        this._textAnimator.ApplyAnimation(this.Text, gameTime);
    }
}