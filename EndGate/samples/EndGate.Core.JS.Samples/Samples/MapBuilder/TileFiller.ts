/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="GridEntry.ts" />

class TileFiller {
    constructor(private _grid: eg.Graphics.Grid, private _tileWidth: number, private _tileHeight: number) {
    }

    public ChangeGrid(grid: eg.Graphics.Grid): void {
        this._grid = grid;
    }

    public Fill(entries: GridEntry[], sources: eg.Graphics.Assets.ImageSource[]): void {
        if (sources.length === 0) {
            return;
        }
        
        var previousEntry: eg.Graphics.Abstractions.Graphic2d,
            sourceIndex = 0;

        for (var i = 0; i < entries.length; i++) {
            previousEntry = this._grid.Get(entries[i].Row, entries[i].Column);

            if (previousEntry) {
                this._grid.Clear(entries[i].Row, entries[i].Column);
            }
            
            this._grid.Fill(entries[i].Row, entries[i].Column, new eg.Graphics.Sprite2d(0,0,sources[sourceIndex++ % sources.length], this._tileWidth, this._tileHeight));
        }
    }

    public Clear(entries: GridEntry[]): void {
        for (var i = 0; i < entries.length; i++) {
            this._grid.Clear(entries[i].Row, entries[i].Column);
        }
    }
}