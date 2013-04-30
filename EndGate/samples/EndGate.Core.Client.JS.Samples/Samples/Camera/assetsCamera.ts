/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endGate.core.client.ts" />

class CameraMover extends eg.Game {
    private _cameraMoveSpeed: number = 100;
    private _cameraZoomSpeed: number = 100;
    private _upKeys: string[] = ["w", "up"];
    private _rightKeys: string[] = ["d", "right"];
    private _downKeys: string[] = ["s", "down"];
    private _leftKeys: string[] = ["a", "left"];
    private _zoomInKeys: string[] = ["r", "'"];
    private _zoomOutKeys: string[] = ["f", "/"];

    private _cameraLocation: eg.Graphics.Circle;
    private _movingDirection: MovingDirection;
    private _cameraPositionHolder: JQuery;
    private _cameraDistanceHolder: JQuery;

    constructor(canvas: HTMLCanvasElement, cameraPositionHolder: JQuery, cameraDistanceHolder: JQuery) {
        super(canvas);

        this._cameraPositionHolder = cameraPositionHolder;
        this._cameraDistanceHolder = cameraDistanceHolder;

        this._cameraLocation = new eg.Graphics.Circle(this.Scene.Camera.Position.X, this.Scene.Camera.Position.Y,5,"black");
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

    public Update(gameTime: eg.GameTime): void {
        var cameraPosition: eg.Vector2d;

        if (this._movingDirection.Up) {
            this.Scene.Camera.Position.Y -= gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if (this._movingDirection.Down) {
            this.Scene.Camera.Position.Y += gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if (this._movingDirection.Left) {
            this.Scene.Camera.Position.X -= gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if (this._movingDirection.Right) {
            this.Scene.Camera.Position.X += gameTime.ElapsedSecond * this._cameraMoveSpeed;
        }
        if (this._movingDirection.ZoomingIn) {
            this.Scene.Camera.Distance -= gameTime.ElapsedSecond * this._cameraZoomSpeed;
        }
        else if (this._movingDirection.ZoomingOut) {
            this.Scene.Camera.Distance += gameTime.ElapsedSecond * this._cameraZoomSpeed;
        }

        this._cameraLocation.Position = this.Scene.Camera.Position;
        
        cameraPosition = this.Scene.Camera.Position.Clone();
        cameraPosition.Apply(Math.round);

        this._cameraPositionHolder.html(cameraPosition.toString());
        this._cameraDistanceHolder.html(Math.round(this.Scene.Camera.Distance).toString());
    }

    private BindKeys(keyList: string[], bindingAction: string, direction: string, directionValue: bool): void {
        for (var i = 0; i < keyList.length; i++) {
            this.Input.Keyboard[bindingAction](keyList[i], () => {
                this._movingDirection[direction] = directionValue;
            });
        }
    }
}

class MovingDirection {
    public Up: bool = false;
    public Right: bool = false;
    public Down: bool = false;
    public Left: bool = false;
    public ZoomingIn: bool = false;
    public ZoomingOut: bool = false;
}