/// <reference path="../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var CameraZoomController = (function () {
        function CameraZoomController(camera, mouse) {
            // When we do a mouse scroll execute this event
            mouse.OnScroll.Bind(function (e) {
                // the e.Direction.Y is 1, 0 or -1, if we multiply that by by our camera zoom speed every time this event gets executed we'll zoom by the speed amount
                camera.Distance += e.Direction.Y * CameraZoomController._cameraZoomSpeed;
            });
        }
        CameraZoomController._cameraZoomSpeed = 30;
        return CameraZoomController;
    })();
    MapCreator.CameraZoomController = CameraZoomController;    
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=CameraZoomController.js.map
