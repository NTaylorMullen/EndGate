var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var FireExplosion = (function () {
    function FireExplosion(x, y, onComplete) {
        this._explosionSpriteSheet = new EndGate.Core.Graphics.Sprites.ImageSource("images/fire_explosion.png", 1152, 128, 0, 0);
        this._explosionAnimation = new EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation(this._explosionSpriteSheet, 18, new EndGate.Core.Assets.Size2d(128, 128), 9);
        this._explosionSprite = new EndGate.Core.Graphics.Sprites.Sprite2d(x, y, this._explosionSpriteSheet, 128, 128);
        this._explosionAnimation.OnComplete.Bind(onComplete);
        this._explosionSprite.Rotation = Math.random() * (Math).twoPI + -Math.PI;
        this.Graphic = this._explosionSprite;
        this._explosionAnimation.Play();
    }
    FireExplosion.prototype.Update = function (gameTime) {
        this._explosionAnimation.Update(gameTime);
    };
    return FireExplosion;
})();
var FireExplosionManager = (function () {
    function FireExplosionManager(_mouse, _scene) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._explosionIds = 0;
        var that = this;
        this._explosions = {
        };
        this._mouse.OnClick.Bind(function (event) {
            var explosionId = that._explosionIds++, explosion;
            explosion = new FireExplosion(event.Position.X, event.Position.Y, function () {
                delete that._explosions[explosionId];
                that._scene.Remove(explosion.Graphic);
            });
            that._explosions[explosionId] = explosion;
            that._scene.Add(explosion.Graphic);
        });
    }
    FireExplosionManager.prototype.Update = function (gameTime) {
        for(var id in this._explosions) {
            this._explosions[id].Update(gameTime);
        }
    };
    return FireExplosionManager;
})();
var RPG = (function (_super) {
    __extends(RPG, _super);
    function RPG(canvas) {
        _super.call(this, canvas);
        this._fireExplosionManager = new FireExplosionManager(this.Input.Mouse, this.Scene);
    }
    RPG.prototype.Update = function (gameTime) {
        this._fireExplosionManager.Update(gameTime);
    };
    return RPG;
})(EndGate.Core.Game);
//@ sourceMappingURL=assetsAnimatedSprites.js.map
