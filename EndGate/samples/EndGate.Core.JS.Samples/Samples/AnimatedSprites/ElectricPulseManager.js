var ElectricPulseManager = (function () {
    function ElectricPulseManager(_mouse, _scene) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._electricPulseIds = 0;
        this._pulseFrequency = 100;
        this._lastPulse = 0;
        var that = this;
        this._electricPulses = {
        };
        this._mouse.OnMove.Bind(function (event) {
            var electricPulseId, electricPulse, now = new Date().getTime();
            if(now - that._lastPulse >= that._pulseFrequency) {
                that._lastPulse = now;
                electricPulseId = that._electricPulseIds++;
                electricPulse = new ElectricPulse(event.Position.X, event.Position.Y, function () {
                    delete that._electricPulses[electricPulseId];
                    that._scene.Remove(electricPulse.Graphic);
                });
                that._electricPulses[electricPulseId] = electricPulse;
                that._scene.Add(electricPulse.Graphic);
            }
        });
    }
    ElectricPulseManager.prototype.Update = function (gameTime) {
        for(var id in this._electricPulses) {
            this._electricPulses[id].Update(gameTime);
        }
    };
    return ElectricPulseManager;
})();
//@ sourceMappingURL=ElectricPulseManager.js.map
