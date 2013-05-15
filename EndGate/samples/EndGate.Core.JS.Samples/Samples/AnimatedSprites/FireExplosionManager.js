var FireExplosionManager = (function () {
    function FireExplosionManager(_mouse, _scene) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._explosionIds = 0;
        var that = this;
        this._explosions = {
        };
        this._mouse.OnClick.Bind(function (event) {
            var explosionId = that._explosionIds++, explosion = new FireExplosion(event.Position.X, event.Position.Y, function () {
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
//@ sourceMappingURL=FireExplosionManager.js.map
