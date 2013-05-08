/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />

class SpriteSheetViewer extends eg.Game {
    private _activeSpriteSheet: eg.Graphics.Assets.ImageSource;
    private _visibleSprite: eg.Graphics.Sprite2d;
    private _visibleGrid: eg.Graphics.Grid;
    private _cameraController: CameraDragController;
    private _tileWidth: number;
    private _tileHeight: number;

    constructor(canvas: HTMLCanvasElement, utilities: JQuery) {
        super(canvas);
        var getSpriteSheet = utilities.find("#getSpriteSheet"),
            spriteSheetUrl = utilities.find("#spriteSheetUrl");
        
        getSpriteSheet.click(() => {
            var promptVal = prompt("Tile Width");

            if (promptVal !== null) {
                this._tileWidth = parseFloat(promptVal);
            }

            promptVal = prompt("Tile Height");

            if (promptVal !== null) {
                this._tileHeight = parseFloat(promptVal);
            }

            this.loadSpritesheet(spriteSheetUrl.val());

            getSpriteSheet.blur();
            spriteSheetUrl.blur();
        });

        this._cameraController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
    }

    private loadSpritesheet(url: string): void {
        this._activeSpriteSheet = new eg.Graphics.Assets.ImageSource(url);        

        this._activeSpriteSheet.OnLoaded.Bind(() => {
            if (this._visibleSprite) {
                this.Scene.Camera.Position = new eg.Vector2d(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2);
                this.Scene.Remove(this._visibleSprite);
            }

            this._visibleSprite = new eg.Graphics.Sprite2d(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2, this._activeSpriteSheet);
            this._visibleGrid = new eg.Graphics.Grid(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2, Math.floor(this._activeSpriteSheet.ClipSize.Height / this._tileHeight), Math.floor(this._activeSpriteSheet.ClipSize.Width / this._tileWidth),this._tileWidth,this._tileHeight,true);
            /*
            for (var i = 0; i < this._visibleSprite.Rows(); i++) {
                for (var j = 0; j < this._visibleSprite.Columns(); j++) {
                    this._visibleSprite.Fill(i + 1, j + 1, new eg.Graphics.Sprite2d(0,0,this._activeSpriteSheet.Extract(j * this._tileWidth, i * this._tileHeight, this._tileWidth, this._tileHeight)));
                }
            }*/

            this.Scene.Add(this._visibleSprite);
            this.Scene.Add(this._visibleGrid);
        });
    }
}