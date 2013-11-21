/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var MapLoading;
(function (MapLoading) {
    var CameraController = (function () {
        function CameraController(_camera, mouse) {
            var _this = this;
            this._camera = _camera;
            this._stationaryBoundary = new eg.Bounds.BoundingCircle(new eg.Vector2d(this._camera.Size.HalfWidth, this._camera.Size.HalfHeight), this._camera.Size.Height * .25);
            this._moving = false;
            this._lastMouseLocation = eg.Vector2d.Zero;

            mouse.OnMove.Bind(function (event) {
                // If our mouse is outside of our stationary boundary then we should move the camera
                if (!_this._stationaryBoundary.Contains(event.Position)) {
                    _this._moving = true;
                    _this._lastMouseLocation = event.Position;
                } else {
                    _this._moving = false;
                }
            });
        }
        CameraController.prototype.Update = function (gameTime) {
            var mouseDistance;

            if (this._moving) {
                // Calculate the distance vector from the middle of the stationary bounds
                mouseDistance = this._lastMouseLocation.Subtract(this._stationaryBoundary.Position);

                // Move the camera in the direction of the mouse
                this._camera.Position = this._camera.Position.Add(mouseDistance.Multiply(gameTime.Elapsed.Seconds));
            }
        };
        return CameraController;
    })();
    MapLoading.CameraController = CameraController;
})(MapLoading || (MapLoading = {}));
//# sourceMappingURL=CameraController.js.map
