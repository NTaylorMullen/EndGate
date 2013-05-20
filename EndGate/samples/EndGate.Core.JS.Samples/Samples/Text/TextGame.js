var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TextGame = (function (_super) {
    __extends(TextGame, _super);
    function TextGame(_canvas, targetAnimators, defaultPosition, defaultRotation, defaultOpacity, _syncSliders) {
        _super.call(this, _canvas);
        this._canvas = _canvas;
        this._syncSliders = _syncSliders;
        var that = this;
        this.Text = new eg.Graphics.Text2d(defaultPosition.X, defaultPosition.Y, "Hello World!");
        this.Text.FontSettings.FontSize(20);
        this.Text.FontSettings.FontFamily(eg.Graphics.Assets.FontFamily.TimesNewRoman);
        this.Scene.Add(this.Text);
        this._textAnimator = new TextAnimator(targetAnimators, defaultPosition, defaultRotation, defaultOpacity, this._syncSliders);
    }
    TextGame.prototype.Update = function (gameTime) {
        this._textAnimator.ApplyAnimation(this.Text, gameTime);
    };
    return TextGame;
})(eg.Game);
//@ sourceMappingURL=TextGame.js.map
