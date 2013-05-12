/// <reference path="../../Scripts/endgate.ts" />

class CameraZoomController {
    private static _cameraZoomSpeed: number = 30;

    constructor(camera: eg.Rendering.Camera2d, mouse: eg.Input.MouseHandler) {
        mouse.OnScroll.Bind((e: eg.Input.IMouseScrollEvent) => {
            camera.Distance += e.Direction.Y * CameraZoomController._cameraZoomSpeed;
        });
    }
}