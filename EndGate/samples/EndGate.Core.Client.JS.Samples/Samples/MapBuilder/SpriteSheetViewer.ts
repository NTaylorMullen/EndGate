/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="CameraZoomController.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileHighlighter.ts" />
/// <reference path="GridEntry.ts" />

class SpriteSheetViewer extends eg.Game {
    public SelectedSources: eg.Graphics.Assets.ImageSource[];

    private _activeSpriteSheet: eg.Graphics.Assets.ImageSource;
    private _visibleGrid: eg.Graphics.Grid;
    private _cameraDragController: CameraDragController;
    private _cameraZoomController: CameraZoomController;
    private _tileSelector: TileSelector;
    private _tileHighlighter: TileHighlighter;

    constructor(canvas: HTMLCanvasElement, utilities: JQuery, private _tileWidth: number, private _tileHeight: number) {
        super(canvas);
        var getSpriteSheet = utilities.find("#getSpriteSheet"),
            spriteSheetUrl = utilities.find("#spriteSheetUrl");

        this.SelectedSources = [];

        getSpriteSheet.click(() => {
            this.loadSpritesheet(spriteSheetUrl.val());

            getSpriteSheet.blur();
            spriteSheetUrl.blur();
        });

        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        this._cameraZoomController = new CameraZoomController(this.Scene.Camera, this.Input.Mouse);

        getSpriteSheet.click();
    }

    private loadSpritesheet(url: string): void {
        this._activeSpriteSheet = new eg.Graphics.Assets.ImageSource(url);

        this._activeSpriteSheet.OnLoaded.Bind(() => {
            var createTileSelector = false;

            if (this._visibleGrid) {
                this.Scene.Camera.Position = new eg.Vector2d(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2);
            }
            else {
                createTileSelector = true;
            }

            this._visibleGrid = new eg.Graphics.Grid(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2, Math.floor(this._activeSpriteSheet.ClipSize.Height / this._tileHeight), Math.floor(this._activeSpriteSheet.ClipSize.Width / this._tileWidth), this._tileWidth, this._tileHeight, true);

            for (var i = 0; i < this._visibleGrid.Rows(); i++) {
                for (var j = 0; j < this._visibleGrid.Columns(); j++) {
                    this._visibleGrid.Fill(i + 1, j + 1, new eg.Graphics.Sprite2d(0, 0, this._activeSpriteSheet.Extract(j * this._tileWidth, i * this._tileHeight, this._tileWidth, this._tileHeight)));
                }
            }

            if (createTileSelector) {
                this._tileHighlighter = new TileHighlighter(this._visibleGrid);
                this._tileSelector = new TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse, (tiles: GridEntry[]) => {
                    var tile;

                    this.SelectedSources = [];
                    
                    for (var i = 0; i < tiles.length; i++) {
                        tile = <eg.Graphics.Sprite2d>this._visibleGrid.Get(tiles[i].Row, tiles[i].Column);

                        if (tile) {
                            this.SelectedSources.push(tile.Image);
                        }
                    }

                    this._tileHighlighter.HighlightTiles(tiles);
                }, (tiles: GridEntry[]) => {
                    var index, tile;

                    for (var i = 0; i < tiles.length; i++) {
                        tile = <eg.Graphics.Sprite2d>this._visibleGrid.Get(tiles[i].Row, tiles[i].Column);

                        if (tile) {
                            index = this.SelectedSources.indexOf(tile.Image);
                            if (index >= 0) {
                                this.SelectedSources.splice(index, 1);
                            }
                        }
                    }

                    this._tileHighlighter.UnHighlightTiles(tiles);
                });
            }

            this.Scene.Add(this._visibleGrid);
        });
    }
}