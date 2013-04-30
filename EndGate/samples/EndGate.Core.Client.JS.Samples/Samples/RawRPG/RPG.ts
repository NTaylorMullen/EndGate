/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="Knight.ts" />
/// <reference path="Player.ts" />

class RPG extends eg.Game {
    private _player: Player;
    private _playersKnight: Knight;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._playersKnight = new Knight(new eg.Vector2d(canvas.width / 2, canvas.height / 2));
        this._player = new Player(this.Input.Keyboard, this._playersKnight);

        this.Scene.Add(this._playersKnight.Graphic);
    }

    public Update(gameTime: eg.GameTime): void {
        // Update the camera to follow our knight.
        this._playersKnight.MovementController.Update(gameTime);
        this.Scene.Camera.Position = this._playersKnight.MovementController.Position;
    }
}