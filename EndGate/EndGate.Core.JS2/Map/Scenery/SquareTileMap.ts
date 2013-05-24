/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Graphics/Sprites/ImageSource.ts" />
/// <reference path="../../Graphics/Grid/Grid.ts" />
/// <reference path="TileMap.ts" />
/// <reference path="Tile.ts" />

module EndGate.Map {

    export class SquareTileMap extends TileMap {
        private _grid: Graphics.Grid;

        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][], drawGridLines?: bool = false) {
            super(x, y, resources);

            this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight,drawGridLines);

            this.FillGridWith(mappings);
        }

        public static ExtractTiles(imageSource: Graphics.Assets.ImageSource, tileWidth: number, tileHeight: number): Graphics.Assets.ImageSource[]{
            var resources: Graphics.Assets.ImageSource[] = [],
                framesPerRow: number = Math.floor(imageSource.ClipSize.Width / tileWidth),
                    rows: number = Math.floor(imageSource.ClipSize.Height / tileHeight);

            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < framesPerRow; j++) {
                    resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                }
            }

            return resources;
        }

        public Draw(context: CanvasRenderingContext2D): void {
            super.StartDraw(context);

            this._grid.Draw(context);

            super.EndDraw(context);
        }

        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = this._grid.GetDrawBounds();

            bounds.Position = this.Position;

            return bounds;
        }

        private FillGridWith(mappings: number[][]): void {
            var tiles: Tile[][] = [];

            for (var i = 0; i < mappings.length; i++) {
                tiles[i] = [];
                for (var j = 0; j < mappings[i].length; j++) {
                    if (mappings[i][j] >= 0) {
                        tiles[i].push(new Tile(this._Resources[mappings[i][j]], this._grid.TileSize().Width, this._grid.TileSize().Height));
                    }
                    else {
                        tiles[i].push(null);
                    }
                }
            }

            this._grid.FillSpace(0, 0, tiles);
        }
    }

}