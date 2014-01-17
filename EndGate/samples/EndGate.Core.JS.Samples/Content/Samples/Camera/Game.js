/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="MovingDirection.ts" />
/// <reference path="World.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var Camera;
(function (Camera) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas, cameraPositionHolder, cameraDistanceHolder) {
            _super.call(this, canvas);
            this._cameraMoveSpeed = 100;
            this._cameraZoomSpeed = 100;
            this._upKeys = ["w", "up"];
            this._rightKeys = ["d", "right"];
            this._downKeys = ["s", "down"];
            this._leftKeys = ["a", "left"];
            this._zoomInKeys = ["r", "'"];
            this._zoomOutKeys = ["f", "/"];

            // These are the div elements on the page that display the camera position and distance
            this._cameraPositionHolder = cameraPositionHolder;
            this._cameraDistanceHolder = cameraDistanceHolder;

            // Builds all the shapes within the game that we can then maneuver around with the camera
            this._world = new Camera.World(this.Scene);

            // A black circle that represents the center of the camera
            this._cameraLocation = new eg.Graphics.Circle(this.Scene.Camera.Position.X, this.Scene.Camera.Position.Y, 5, eg.Graphics.Color.Black);
            this.Scene.Add(this._cameraLocation);

            // Need to monitor moving directions so we know which way to move based on flags
            this._movingDirection = new Camera.MovingDirection();
            this.BindKeys(this._upKeys, "OnCommandDown", "Up", true);
            this.BindKeys(this._rightKeys, "OnCommandDown", "Right", true);
            this.BindKeys(this._downKeys, "OnCommandDown", "Down", true);
            this.BindKeys(this._leftKeys, "OnCommandDown", "Left", true);
            this.BindKeys(this._zoomInKeys, "OnCommandDown", "ZoomingIn", true);
            this.BindKeys(this._zoomOutKeys, "OnCommandDown", "ZoomingOut", true);
            this.BindKeys(this._upKeys, "OnCommandUp", "Up", false);
            this.BindKeys(this._rightKeys, "OnCommandUp", "Right", false);
            this.BindKeys(this._downKeys, "OnCommandUp", "Down", false);
            this.BindKeys(this._leftKeys, "OnCommandUp", "Left", false);
            this.BindKeys(this._zoomInKeys, "OnCommandUp", "ZoomingIn", false);
            this.BindKeys(this._zoomOutKeys, "OnCommandUp", "ZoomingOut", false);
        }
        Game.prototype.Update = function (gameTime) {
            var cameraPosition, movementIncrementor = gameTime.Elapsed.Seconds * this._cameraMoveSpeed, zoomIncrementor = gameTime.Elapsed.Seconds * this._cameraZoomSpeed;

            // Handle movement directions, these flags are controlled by the user based on what keys they press
            if (this._movingDirection.Up) {
                this.Scene.Camera.Position.Y -= movementIncrementor;
            }
            if (this._movingDirection.Down) {
                this.Scene.Camera.Position.Y += movementIncrementor;
            }
            if (this._movingDirection.Left) {
                this.Scene.Camera.Position.X -= movementIncrementor;
            }
            if (this._movingDirection.Right) {
                this.Scene.Camera.Position.X += movementIncrementor;
            }

            // Handle zooming in, these flags are controlled by the user based on what keys they press
            /*if (this._movingDirection.ZoomingIn) {
            this.Scene.Camera.Distance -= zoomIncrementor;
            }
            else if (this._movingDirection.ZoomingOut) {
            this.Scene.Camera.Distance += zoomIncrementor;
            }*/
            // Set the camera location (black circle) to the camera position so it's displayed in the center of the camera
            this._cameraLocation.Position = this.Scene.Camera.Position;

            // Clone the Camera position and then round it so it's not a large float value that is displayed to the user
            cameraPosition = this.Scene.Camera.Position.Clone();
            cameraPosition.Apply(Math.round);

            // Update the HTML elements on the screen to show the camera position and the camera distance
            this._cameraPositionHolder.html(cameraPosition.toString());
            //this._cameraDistanceHolder.html(Math.round(this.Scene.Camera.Distance).toString());
        };

        // Helper function to bind keys to the moving direction flags
        Game.prototype.BindKeys = function (keyList, bindingAction, direction, directionValue) {
            var _this = this;
            for (var i = 0; i < keyList.length; i++) {
                this.Input.Keyboard[bindingAction](keyList[i], function () {
                    _this._movingDirection[direction] = directionValue;
                });
            }
        };
        return Game;
    })(eg.Game);
    Camera.Game = Game;
})(Camera || (Camera = {}));
//# sourceMappingURL=Game.js.map
