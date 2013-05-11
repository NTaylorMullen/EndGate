/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="Blank.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileFiller.ts" />
/// <reference path="GridEntry.ts" />
/// <reference path="SpriteSheetViewer.ts" />

class MapBuilder extends eg.Game {
    private _visibleGrid: eg.Graphics.Grid;
    private _cameraDragController: CameraDragController;
    private _tileSelector: TileSelector;
    private _tileFiller: TileFiller;

    constructor(canvas: HTMLCanvasElement, utilities: JQuery, private _spriteSheetViewer: SpriteSheetViewer, private _rows: number, private _columns: number, private _tileWidth: number, private _tileHeight: number) {
        super(canvas);

        this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);

        this.Scene.Add(this._visibleGrid);

        this._tileFiller = new TileFiller(this._visibleGrid, _tileWidth, _tileHeight);
        this._tileSelector = new TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse,
        (gridEntries: GridEntry[]) => {
            this._tileFiller.Fill(gridEntries, this._spriteSheetViewer.SelectedSources);
        },
        (gridEntries: GridEntry[]) => {
            this._tileFiller.Clear(gridEntries);
        });
    }
}