/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="GridEntry.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var TileHighlighter = (function () {
        function TileHighlighter(_grid) {
            this._grid = _grid;
            this.SelectedTiles = [];
        }
        TileHighlighter.prototype.HighlightTiles = function (tiles) {
            var tile, gridTile;

            for (var i = 0; i < this.SelectedTiles.length; i++) {
                this._grid.RemoveChild(this.SelectedTiles[i]);
            }

            this.SelectedTiles = [];

            for (var i = 0; i < tiles.length; i++) {
                gridTile = this._grid.Get(tiles[i].Row, tiles[i].Column);
                if (gridTile) {
                    tile = new eg.Graphics.Rectangle(gridTile.Position.X, gridTile.Position.Y, gridTile.Size.Width, gridTile.Size.Height);
                    tile.Border(2, "red");
                    this._grid.AddChild(tile);
                    this.SelectedTiles.push(tile);
                }
            }
        };

        TileHighlighter.prototype.UnHighlightTiles = function (tiles) {
            var gridTile;

            for (var i = 0; i < tiles.length; i++) {
                gridTile = this._grid.Get(tiles[i].Row, tiles[i].Column);

                if (gridTile) {
                    for (var j = 0; j < this.SelectedTiles.length; j++) {
                        if (this.SelectedTiles[j].Position.Equivalent(gridTile.Position)) {
                            this._grid.RemoveChild(this.SelectedTiles[j]);
                            this.SelectedTiles.splice(j--, 1);
                            tiles.splice(i--, 1);
                            break;
                        }
                    }

                    if (this.SelectedTiles.length === 0) {
                        break;
                    }
                }
            }
        };
        return TileHighlighter;
    })();
    MapCreator.TileHighlighter = TileHighlighter;
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=TileHighlighter.js.map
