var TileFiller = (function () {
    function TileFiller(_grid, _tileWidth, _tileHeight) {
        this._grid = _grid;
        this._tileWidth = _tileWidth;
        this._tileHeight = _tileHeight;
    }
    TileFiller.prototype.ChangeGrid = function (grid) {
        this._grid = grid;
    };
    TileFiller.prototype.Fill = function (entries, sources) {
        if(sources.length === 0) {
            return;
        }
        var previousEntry, sourceIndex = 0;
        for(var i = 0; i < entries.length; i++) {
            previousEntry = this._grid.Get(entries[i].Row, entries[i].Column);
            if(previousEntry) {
                this._grid.Clear(entries[i].Row, entries[i].Column);
            }
            this._grid.Fill(entries[i].Row, entries[i].Column, new eg.Graphics.Sprite2d(0, 0, sources[sourceIndex++ % sources.length], this._tileWidth, this._tileHeight));
        }
    };
    TileFiller.prototype.Clear = function (entries) {
        for(var i = 0; i < entries.length; i++) {
            this._grid.Clear(entries[i].Row, entries[i].Column);
        }
    };
    return TileFiller;
})();
//@ sourceMappingURL=TileFiller.js.map
