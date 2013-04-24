var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CameraMover = (function (_super) {
    __extends(CameraMover, _super);
    function CameraMover(canvas, cameraPositionHolder, cameraDistanceHolder) {
        _super.call(this, canvas);
        this._cameraMoveSpeed = 100;
        this._cameraZoomSpeed = 100;
        this._upKeys = [
            "w", 
            "up"
        ];
        this._rightKeys = [
            "d", 
            "right"
        ];
        this._downKeys = [
            "s", 
            "down"
        ];
        this._leftKeys = [
            "a", 
            "left"
        ];
        this._zoomInKeys = [
            "r", 
            "'"
        ];
        this._zoomOutKeys = [
            "f", 
            "/"
        ];
        this._cameraPositionHolder = cameraPositionHolder;
        this._cameraDistanceHolder = cameraDistanceHolder;
        this._cameraLocation = new EndGate.Core.Graphics.Shapes.Circle(this.Scene.Camera.Position.X, this.Scene.Camera.Position.Y, 5, "black");
        this._movingDirection = new MovingDirection();
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
        this.Scene.Add(this._cameraLocation);
    }
    CameraMover.prototype.Update = function (gameTime) {
        var cameraPosition;
        if(this._movingDirection.Up) {
            this.Scene.Camera.Position.Y -= gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if(this._movingDirection.Down) {
            this.Scene.Camera.Position.Y += gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if(this._movingDirection.Left) {
            this.Scene.Camera.Position.X -= gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if(this._movingDirection.Right) {
            this.Scene.Camera.Position.X += gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if(this._movingDirection.ZoomingIn) {
            this.Scene.Camera.Distance -= gameTime.ElapsedSecond * this._cameraZoomSpeed;
        } else if(this._movingDirection.ZoomingOut) {
            this.Scene.Camera.Distance += gameTime.ElapsedSecond * this._cameraZoomSpeed;
        }
        this._cameraLocation.Position = this.Scene.Camera.Position;
        cameraPosition = this.Scene.Camera.Position.Clone();
        cameraPosition.Apply(Math.round);
        this._cameraPositionHolder.html(cameraPosition.toString());
        this._cameraDistanceHolder.html(Math.round(this.Scene.Camera.Distance).toString());
    };
    CameraMover.prototype.BindKeys = function (keyList, bindingAction, direction, directionValue) {
        var _this = this;
        for(var i = 0; i < keyList.length; i++) {
            this.Input.Keyboard[bindingAction](keyList[i], function () {
                _this._movingDirection[direction] = directionValue;
            });
        }
    };
    return CameraMover;
})(EndGate.Core.Game);
var MovingDirection = (function () {
    function MovingDirection() {
        this.Up = false;
        this.Right = false;
        this.Down = false;
        this.Left = false;
        this.ZoomingIn = false;
        this.ZoomingOut = false;
    }
    return MovingDirection;
})();
//@ sourceMappingURL=assetsCamera.js.map
