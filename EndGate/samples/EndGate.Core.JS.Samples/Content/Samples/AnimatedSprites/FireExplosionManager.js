/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="FireExplosion.ts" />
// Wrap in module to keep code out of global scope
var AnimatedSprites;
(function (AnimatedSprites) {
    var FireExplosionManager = (function () {
        function FireExplosionManager(_mouse, _scene) {
            this._mouse = _mouse;
            this._scene = _scene;
            this._explosionIds = 0;
            var that = this;

            this._explosions = {};

            // Trigger when any mouse button is clicked over the game area
            this._mouse.OnClick.Bind(function (event) {
                var explosionId = that._explosionIds++, explosion = new AnimatedSprites.FireExplosion(event.Position.X, event.Position.Y, function () {
                    // This is the on animation completed callback
                    // We want to remove  the explosions from our list of active explosions (so we don't update it anymore)
                    delete that._explosions[explosionId];

                    // And we want to remove it from the scene so we don't draw it anymore
                    that._scene.Remove(explosion.Graphic);
                });

                // Save the created explosion so we can now update/draw it
                that._explosions[explosionId] = explosion;
                that._scene.Add(explosion.Graphic);
            });
        }
        FireExplosionManager.prototype.Update = function (gameTime) {
            for (var id in this._explosions) {
                this._explosions[id].Update(gameTime);
            }
        };
        return FireExplosionManager;
    })();
    AnimatedSprites.FireExplosionManager = FireExplosionManager;
})(AnimatedSprites || (AnimatedSprites = {}));
//# sourceMappingURL=FireExplosionManager.js.map
