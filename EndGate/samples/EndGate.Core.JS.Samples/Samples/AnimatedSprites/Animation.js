var Animation = (function () {
    function Animation(imageSrc, x, y, spriteSheetWidth, spriteSheetHeight, frameWidth, frameHeight, fps, frameCount, onComplete) {
        this._spriteSheet = new eg.Graphics.Assets.ImageSource(imageSrc, spriteSheetWidth, spriteSheetHeight);
        this._animation = new eg.Graphics.SpriteAnimation(this._spriteSheet, fps, new eg.Size2d(frameWidth, frameHeight), frameCount);
        this._animation.OnComplete.Bind(onComplete);
        this.Graphic = new eg.Graphics.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);
        this.Graphic.Rotation = Math.random() * (Math).twoPI + -Math.PI;
        this._animation.Play();
    }
    Animation.prototype.Update = function (gameTime) {
        this._animation.Update(gameTime);
    };
    return Animation;
})();
//@ sourceMappingURL=Animation.js.map
