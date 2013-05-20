/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="Knight.ts" />
/// <reference path="Player.ts" />

class RPG extends eg.Game {
    private _player: Player;
    private _playersKnight: Knight;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        // The playersKnight is the knight that is drawn on the screen
        this._playersKnight = new Knight(new eg.Vector2d(canvas.width / 2, canvas.height / 2));
        // The player is the gate way for the user viewing the web page to control the knight
        this._player = new Player(this.Input.Keyboard, this._playersKnight);

        // Draw the players knight on the screen
        this.Scene.Add(this._playersKnight.Graphic);
    }

    public Update(gameTime: eg.GameTime): void {
        // Update the knight so it can move etc.
        this._playersKnight.Update(gameTime);
        
        // Update the camera to follow our knight.
        this.Scene.Camera.Position = this._playersKnight.MovementController.Position;
    }
}