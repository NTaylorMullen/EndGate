/// <reference path="../../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module MapLoading {

    export class CameraController {
        // This represents the area that will keep the camera stationary
        private _stationaryBoundary: eg.Bounds.BoundingCircle;
        // Should we be moving the camera
        private _moving: boolean;
        private _lastMouseLocation: eg.Vector2d;

        constructor(private _camera: eg.Rendering.Camera2d, mouse: eg.Input.MouseHandler) {
            this._stationaryBoundary = new eg.Bounds.BoundingCircle(new eg.Vector2d(this._camera.Size.HalfWidth, this._camera.Size.HalfHeight), this._camera.Size.Height * .25);
            this._moving = false;
            this._lastMouseLocation = eg.Vector2d.Zero;

            mouse.OnMove.Bind((event: eg.Input.IMouseEvent) => {
                // If our mouse is outside of our stationary boundary then we should move the camera
                if (!this._stationaryBoundary.Contains(event.Position)) {
                    this._moving = true;
                    this._lastMouseLocation = event.Position;
                }
                else {
                    this._moving = false;
                }
            });
        }

        public Update(gameTime: eg.GameTime): void {
            var mouseDistance: eg.Vector2d;

            if (this._moving) {
                // Calculate the distance vector from the middle of the stationary bounds
                mouseDistance = this._lastMouseLocation.Subtract(this._stationaryBoundary.Position);
                // Move the camera in the direction of the mouse
                this._camera.Position = this._camera.Position.Add(mouseDistance.Multiply(gameTime.Elapsed.Seconds));
            }
        }

    }

}