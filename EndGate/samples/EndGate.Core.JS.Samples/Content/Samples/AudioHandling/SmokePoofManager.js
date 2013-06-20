/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="SmokePoof.ts" />
// Wrap in module to keep code out of global scope
var AudioHandling;
(function (AudioHandling) {
    var SmokePoofManager = (function () {
        function SmokePoofManager(_mouse, _scene, _onClickSound) {
            var _this = this;
            this._mouse = _mouse;
            this._scene = _scene;
            this._onClickSound = _onClickSound;
            this._smokePoofIds = 0;
            var that = this;

            this._smokePoofs = {};

            // Trigger when any mouse button is clicked over the game area
            this._mouse.OnClick.Bind(function (event) {
                var smokePoofId = that._smokePoofIds++, smokePoof = new AudioHandling.SmokePoof(event.Position.X, event.Position.Y, function () {
                    // This is the on animation completed callback
                    // We want to remove  the explosions from our list of active explosions (so we don't update it anymore)
                    delete that._smokePoofs[smokePoofId];

                    // And we want to remove it from the scene so we don't draw it anymore
                    that._scene.Remove(smokePoof.Graphic);
                });

                // Play the smoke poof sound.  Since the sound clip has a bit of dead silence at the start we want to seek to 100ms where the actual poof sound starts
                _this._onClickSound.Play().Seek(.1);

                // Save the created explosion so we can now update/draw it
                that._smokePoofs[smokePoofId] = smokePoof;
                that._scene.Add(smokePoof.Graphic);
            });
        }
        SmokePoofManager.prototype.Update = function (gameTime) {
            for (var id in this._smokePoofs) {
                this._smokePoofs[id].Update(gameTime);
            }
        };
        return SmokePoofManager;
    })();
    AudioHandling.SmokePoofManager = SmokePoofManager;
})(AudioHandling || (AudioHandling = {}));
//@ sourceMappingURL=SmokePoofManager.js.map
