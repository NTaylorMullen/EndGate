var CameraZoomController = (function () {
    function CameraZoomController(camera, mouse) {
        mouse.OnScroll.Bind(function (e) {
            camera.Distance += e.Direction.Y * CameraZoomController._cameraZoomSpeed;
        });
    }
    CameraZoomController._cameraZoomSpeed = 30;
    return CameraZoomController;
})();
//@ sourceMappingURL=CameraZoomController.js.map
