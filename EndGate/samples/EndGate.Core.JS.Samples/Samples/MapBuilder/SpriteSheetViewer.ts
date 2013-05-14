/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="CameraZoomController.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileHighlighter.ts" />
/// <reference path="GridEntry.ts" />

class SpriteSheetViewer extends eg.Game {
    public SelectedSources: eg.Graphics.Assets.ImageSource[];
    public VisibleGrid: eg.Graphics.Grid;
    public ActiveSpriteSheet: eg.Graphics.Assets.ImageSource;

    private _cameraDragController: CameraDragController;
    private _cameraZoomController: CameraZoomController;
    private _tileSelector: TileSelector;
    private _tileHighlighter: TileHighlighter;

    constructor(canvas: HTMLCanvasElement, public SpriteSheetUrl: string, private _tileWidth: number, private _tileHeight: number, private _readyCallback?: Function) {
        super(canvas);

        this.SelectedSources = [];
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        this._cameraZoomController = new CameraZoomController(this.Scene.Camera, this.Input.Mouse);
        this.loadSpritesheet(SpriteSheetUrl);
    }

    private loadSpritesheet(url: string): void {
        this.ActiveSpriteSheet = new eg.Graphics.Assets.ImageSource(url);

        this.ActiveSpriteSheet.OnLoaded.Bind(() => {
            var createTileSelector = false;

            if (this.VisibleGrid) {
                this.Scene.Camera.Position = new eg.Vector2d(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2);
            }
            else {
                createTileSelector = true;
            }

            this.VisibleGrid = new eg.Graphics.Grid(this.Scene.DrawArea.width / 2, this.Scene.DrawArea.height / 2, Math.floor(this.ActiveSpriteSheet.ClipSize.Height / this._tileHeight), Math.floor(this.ActiveSpriteSheet.ClipSize.Width / this._tileWidth), this._tileWidth, this._tileHeight, true);

            for (var i = 0; i < this.VisibleGrid.Rows(); i++) {
                for (var j = 0; j < this.VisibleGrid.Columns(); j++) {
                    this.VisibleGrid.Fill(i, j, new eg.Graphics.Sprite2d(0, 0, this.ActiveSpriteSheet.Extract(j * this._tileWidth, i * this._tileHeight, this._tileWidth, this._tileHeight)));
                }
            }

            if (createTileSelector) {
                this._tileHighlighter = new TileHighlighter(this.VisibleGrid);
                this._tileSelector = new TileSelector(this.VisibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse, (tiles: GridEntry[]) => {
                    var tile;

                    this.SelectedSources = [];
                    
                    for (var i = 0; i < tiles.length; i++) {
                        tile = <eg.Graphics.Sprite2d>this.VisibleGrid.Get(tiles[i].Row, tiles[i].Column);

                        if (tile) {
                            this.SelectedSources.push(tile.Image);
                        }
                    }

                    this._tileHighlighter.HighlightTiles(tiles);
                }, (tiles: GridEntry[]) => {
                    var index, tile;

                    for (var i = 0; i < tiles.length; i++) {
                        tile = <eg.Graphics.Sprite2d>this.VisibleGrid.Get(tiles[i].Row, tiles[i].Column);

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

            this.Scene.Add(this.VisibleGrid);

            if (this._readyCallback) {
                this._readyCallback();
            }
        });
    }
}