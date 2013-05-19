var CameraDragController = (function () {
    function CameraDragController(canvas, camera, keyboardHandler, mouseHandler) {
        var _this = this;
        this._dragging = false;
        this.Active = false;
        keyboardHandler.OnCommandPress("space", function (e) {
            _this.Active = !_this.Active;
            if(_this.Active) {
                canvas.style.cursor = "move";
            } else {
                canvas.style.cursor = "default";
            }
        });
        mouseHandler.OnDown.Bind(function (e) {
            _this._downAt = e.Position;
            _this._cameraStartPosition = camera.Position.Clone();
            _this._dragging = true;
        });
        mouseHandler.OnUp.Bind(function (e) {
            _this._cameraStartPosition = null;
            window.setTimeout(function () {
                this.Dragging = false;
            }, 150);
        });
        mouseHandler.OnMove.Bind(function (e) {
            if(_this._dragging && _this._cameraStartPosition && _this.Active) {
                camera.Position = _this._cameraStartPosition.Add(_this._downAt.Subtract(e.Position));
            }
        });
    }
    return CameraDragController;
})();
//@ sourceMappingURL=CameraDragController.js.map
