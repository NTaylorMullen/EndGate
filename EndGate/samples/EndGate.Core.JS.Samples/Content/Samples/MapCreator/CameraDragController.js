/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var CameraDragController = (function () {
        function CameraDragController(canvas, camera, keyboardHandler, mouseHandler) {
            var _this = this;
            this._dragging = false;
            this.Active = false;

            // Whenever we press space execute this function
            keyboardHandler.OnCommandPress("space", function (e) {
                // Toggle the active flag
                _this.Active = !_this.Active;

                // Modify how the cursor appears above the game area
                if (_this.Active) {
                    canvas.style.cursor = "move";
                } else {
                    canvas.style.cursor = "default";
                }
            });

            // When we press down with the mouse (any button, left right or mid) execute this function
            mouseHandler.OnDown.Bind(function (e) {
                // Record where the mouse went down at
                _this._downAt = e.Position;

                // Record camera position, we clone it so when it's modified our reference does not get modified
                _this._cameraStartPosition = camera.Position.Clone();
                _this._dragging = true;
            });

            // When we press down with the mouse (any button, left right or mid) execute this function
            mouseHandler.OnUp.Bind(function (e) {
                // Clear our camera start position
                _this._cameraStartPosition = null;

                // Delay setting the dragging to false, this allows for click events etc. to complete
                window.setTimeout(function () {
                    this.Dragging = false;
                }, 150);
            });

            mouseHandler.OnMove.Bind(function (e) {
                // Ensure that we're dragging, if we are start moving the camera
                if (_this._dragging && _this._cameraStartPosition && _this.Active) {
                    camera.Position = _this._cameraStartPosition.Add(_this._downAt.Subtract(e.Position));
                }
            });
        }
        return CameraDragController;
    })();
    MapCreator.CameraDragController = CameraDragController;
})(MapCreator || (MapCreator = {}));
//# sourceMappingURL=CameraDragController.js.map
