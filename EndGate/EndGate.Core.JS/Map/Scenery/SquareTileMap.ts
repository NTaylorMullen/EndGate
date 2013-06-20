/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Graphics/Sprites/ImageSource.ts" />
/// <reference path="../../Graphics/Grid/Grid.ts" />
/// <reference path="TileMap.ts" />
/// <reference path="SquareTile.ts" />

module eg.Map {

    /**
    * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
    */
    export class SquareTileMap extends TileMap {
        private _grid: Graphics.Grid;
        private _staticMap: bool;
        private _mapCache: HTMLCanvasElement;

        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][]);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][], staticMap: bool);
        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        * @param staticMap Whether or not image tiles will change throughout the SquareTileMap's lifetime, defaults to true and cannot change after construction.
        * @param drawGridLines Whether or not to draw the tile maps grid lines. Useful when trying to pinpoint specific tiles (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][], staticMap: bool, drawGridLines: bool);
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.Assets.ImageSource[], mappings: number[][], staticMap: bool = true, drawGridLines: bool = false) {
            super(x, y, resources);

            this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight,drawGridLines);
            this._staticMap = staticMap;            

            this.FillGridWith(mappings);

            if (this._staticMap) {
                this.BuildCache();
            }
        }

        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
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

        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            super._StartDraw(context);

            if (!this._staticMap) {
                this._grid.Draw(context);
            }
            else {
                context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
            }

            super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        public GetDrawBounds(): Bounds.Abstractions.Bounds2d {
            var bounds = this._grid.GetDrawBounds();

            bounds.Position = this.Position;

            return bounds;
        }

        private BuildCache(): void {
            var size: Size2d = this._grid.Size(),
                originalPosition = this._grid.Position;

            this._mapCache = <HTMLCanvasElement>document.createElement("canvas");
            this._mapCache.width = size.Width;
            this._mapCache.height = size.Height;

            // Draw the grid onto the cached map
            this._grid.Position = new Vector2d(size.HalfWidth(), size.HalfHeight());
            this._grid.Draw(this._mapCache.getContext("2d"));
            this._grid.Position = originalPosition;
        }

        private FillGridWith(mappings: number[][]): void {
            var tiles: SquareTile[][] = [];

            for (var i = 0; i < mappings.length; i++) {
                tiles[i] = [];
                for (var j = 0; j < mappings[i].length; j++) {
                    if (mappings[i][j] >= 0) {
                        tiles[i].push(new SquareTile(this._Resources[mappings[i][j]], this._grid.TileSize().Width, this._grid.TileSize().Height));
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