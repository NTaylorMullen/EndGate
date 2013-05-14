var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Map) {
        var SquareTileMap = (function (_super) {
            __extends(SquareTileMap, _super);
            function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, drawGridLines) {
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                        _super.call(this, x, y, resources);
                this._grid = new EndGate.Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
                this.FillGridWith(mappings);
            }
            SquareTileMap.ExtractTiles = function ExtractTiles(imageSource, tileWidth, tileHeight) {
                var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);
                for(var i = 0; i < rows; i++) {
                    for(var j = 0; j < framesPerRow; j++) {
                        resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                    }
                }
                return resources;
            };
            SquareTileMap.prototype.Draw = function (context) {
                _super.prototype.StartDraw.call(this, context);
                this._grid.Draw(context);
                _super.prototype.EndDraw.call(this, context);
            };
            SquareTileMap.prototype.GetDrawBounds = function () {
                var bounds = this._grid.GetDrawBounds();
                bounds.Position = this.Position;
                return bounds;
            };
            SquareTileMap.prototype.FillGridWith = function (mappings) {
                var tiles = [];
                for(var i = 0; i < mappings.length; i++) {
                    tiles[i] = [];
                    for(var j = 0; j < mappings[i].length; j++) {
                        if(mappings[i][j] >= 0) {
                            tiles[i].push(new Map.Tile(this._Resources[mappings[i][j]], this._grid.TileSize().Width, this._grid.TileSize().Height));
                        } else {
                            tiles[i].push(null);
                        }
                    }
                }
                this._grid.FillSpace(0, 0, tiles);
            };
            return SquareTileMap;
        })(Map.TileMap);
        Map.SquareTileMap = SquareTileMap;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=SquareTileMap.js.map
