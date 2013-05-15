var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AnimatedSprites = (function (_super) {
    __extends(AnimatedSprites, _super);
    function AnimatedSprites(canvas) {
        _super.call(this, canvas);
        this._fireExplosionManager = new FireExplosionManager(this.Input.Mouse, this.Scene);
        this._electricPulseManager = new ElectricPulseManager(this.Input.Mouse, this.Scene);
    }
    AnimatedSprites.prototype.Update = function (gameTime) {
        this._fireExplosionManager.Update(gameTime);
        this._electricPulseManager.Update(gameTime);
    };
    return AnimatedSprites;
})(eg.Game);
//@ sourceMappingURL=AnimatedSprites.js.map
