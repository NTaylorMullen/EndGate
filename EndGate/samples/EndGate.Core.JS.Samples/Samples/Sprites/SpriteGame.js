var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SpriteGame = (function (_super) {
    __extends(SpriteGame, _super);
    function SpriteGame(_canvas, targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, _syncSliders) {
        _super.call(this, _canvas);
        this._canvas = _canvas;
        this._syncSliders = _syncSliders;
        this.Sprite = new eg.Graphics.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new eg.Graphics.Assets.ImageSource("html5-logo.png", 200, 200));
        this._spriteAnimator = new SpriteAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);
        this.Scene.Add(this.Sprite);
    }
    SpriteGame.prototype.Update = function (gameTime) {
        this._spriteAnimator.ApplyAnimation(this.Sprite, gameTime);
    };
    return SpriteGame;
})(eg.Game);
//@ sourceMappingURL=SpriteGame.js.map
