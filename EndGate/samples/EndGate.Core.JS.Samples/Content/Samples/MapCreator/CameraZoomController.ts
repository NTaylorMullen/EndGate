/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export class CameraZoomController {
        private static _cameraZoomSpeed: number = 30;

        constructor(camera: eg.Rendering.Camera2d, mouse: eg.Input.MouseHandler) {
            // When we do a mouse scroll execute this event
            mouse.OnScroll.Bind((e: eg.Input.IMouseScrollEvent) => {
                // the e.Direction.Y is 1, 0 or -1, if we multiply that by by our camera zoom speed every time this event gets executed we'll zoom by the speed amount
                camera.Distance += e.Direction.Y * CameraZoomController._cameraZoomSpeed;
            });
        }
    }

}