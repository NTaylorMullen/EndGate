var SmokePoofManager = (function () {
    function SmokePoofManager(_mouse, _scene, _onClickSound) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._onClickSound = _onClickSound;
        var _this = this;
        this._smokePoofIds = 0;
        var that = this;
        this._smokePoofs = {
        };
        this._mouse.OnClick.Bind(function (event) {
            var smokePoofId = that._smokePoofIds++, smokePoof = new SmokePoof(event.Position.X, event.Position.Y, function () {
                delete that._smokePoofs[smokePoofId];
                that._scene.Remove(smokePoof.Graphic);
            });
            _this._onClickSound.Play().Seek(.1);
            that._smokePoofs[smokePoofId] = smokePoof;
            that._scene.Add(smokePoof.Graphic);
        });
    }
    SmokePoofManager.prototype.Update = function (gameTime) {
        for(var id in this._smokePoofs) {
            this._smokePoofs[id].Update(gameTime);
        }
    };
    return SmokePoofManager;
})();
//@ sourceMappingURL=SmokePoofManager.js.map
