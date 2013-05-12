/// <reference path="../../Scripts/endgate.ts" />

class CameraDragController {
    public Active: bool;

    private _dragging: bool;
    private _downAt: eg.Vector2d;
    private _upAt: eg.Vector2d;
    private _cameraStartPosition: eg.Vector2d;

    constructor(canvas: HTMLCanvasElement, camera: eg.Rendering.Camera2d, keyboardHandler: eg.Input.KeyboardHandler, mouseHandler: eg.Input.MouseHandler) {
        this._dragging = false;
        this.Active = false;

        keyboardHandler.OnCommandPress("space", (e: eg.Input.KeyboardCommandEvent) => {
            this.Active = !this.Active;

            if (this.Active) {
                canvas.style.cursor = "move";
            }
            else {
                canvas.style.cursor = "default";
            }
        });

        mouseHandler.OnDown.Bind((e: eg.Input.IMouseClickEvent) => {
            this._downAt = e.Position;
            this._cameraStartPosition = camera.Position.Clone();
            this._dragging = true;
        });

        mouseHandler.OnUp.Bind((e: eg.Input.IMouseClickEvent) => {
            this._upAt = e.Position;
            this._cameraStartPosition = null;
            // Delay setting the dragging to false, this allows for click events etc. to complete
            window.setTimeout(function () {
                this.Dragging = false;
            }, 150)
        });

        mouseHandler.OnMove.Bind((e: eg.Input.IMouseEvent) => {
            if (this._dragging && this._cameraStartPosition && this.Active) {
                camera.Position = this._cameraStartPosition.Add(this._downAt.Subtract(e.Position));
            }
        });
    }
}