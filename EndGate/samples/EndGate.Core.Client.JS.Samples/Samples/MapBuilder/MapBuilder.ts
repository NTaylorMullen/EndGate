/// <reference path="../../Scripts/endGate.core.client.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />

class MapBuilder extends eg.Game {
    private _visibleGrid: eg.Graphics.Grid;
    private _cameraDragController: CameraDragController;

    constructor(canvas: HTMLCanvasElement, utilities: JQuery, private _rows: number, private _columns: number, private _tileWidth: number, private _tileHeight: number) {
        super(canvas);

        this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);

        this.Scene.Add(this._visibleGrid);
    }
}