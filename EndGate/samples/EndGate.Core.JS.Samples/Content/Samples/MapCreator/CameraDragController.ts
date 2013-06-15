/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export class CameraDragController {
        public Active: bool;

        private _dragging: bool;
        private _downAt: eg.Vector2d;
        private _cameraStartPosition: eg.Vector2d;

        constructor(canvas: HTMLCanvasElement, camera: eg.Rendering.Camera2d, keyboardHandler: eg.Input.KeyboardHandler, mouseHandler: eg.Input.MouseHandler) {
            this._dragging = false;
            this.Active = false;

            // Whenever we press space execute this function
            keyboardHandler.OnCommandPress("space", (e: eg.Input.KeyboardCommandEvent) => {
                // Toggle the active flag
                this.Active = !this.Active;

                // Modify how the cursor appears above the game area
                if (this.Active) {
                    canvas.style.cursor = "move";
                }
                else {
                    canvas.style.cursor = "default";
                }
            });

            // When we press down with the mouse (any button, left right or mid) execute this function
            mouseHandler.OnDown.Bind((e: eg.Input.IMouseClickEvent) => {
                // Record where the mouse went down at
                this._downAt = e.Position;
                // Record camera position, we clone it so when it's modified our reference does not get modified
                this._cameraStartPosition = camera.Position.Clone();
                this._dragging = true;
            });

            // When we press down with the mouse (any button, left right or mid) execute this function
            mouseHandler.OnUp.Bind((e: eg.Input.IMouseClickEvent) => {
                // Clear our camera start position
                this._cameraStartPosition = null;
                // Delay setting the dragging to false, this allows for click events etc. to complete
                window.setTimeout(function () {
                    this.Dragging = false;
                }, 150)
            });

            mouseHandler.OnMove.Bind((e: eg.Input.IMouseEvent) => {
                // Ensure that we're dragging, if we are start moving the camera
                if (this._dragging && this._cameraStartPosition && this.Active) {
                    camera.Position = this._cameraStartPosition.Add(this._downAt.Subtract(e.Position));
                }
            });
        }
    }

}