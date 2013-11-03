/// <reference path="../../Assets/Sizes/Size2d.ts" />
/// <reference path="../../Assets/TimeSpan.ts" />
/// <reference path="../../Graphics/ImageSource.ts" />
/// <reference path="../../Graphics/Grid/Grid.ts" />
/// <reference path="../../Utilities/EventHandler2.ts" />
/// <reference path="../../Utilities/EventHandler.ts" />
/// <reference path="../../Extensions/Helpers.ts" />
/// <reference path="ITileDetails.ts" />
/// <reference path="TileMap.ts" />
/// <reference path="SquareTile.ts" />

module EndGate.Graphics {

    /**
    * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
    */
    export class SquareTileMap extends TileMap {
        /**
        * Gets or sets the tile load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between tile loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public TileLoadDelay: TimeSpan;
        /**
        * Gets or sets the row load delay component.  This can be used to slowly load a square tile map to prevent the browser from freezing by adding a delay between row loads to allow time for the DOM to update.  Defaults to TimeSpan.Zero.
        */
        public RowLoadDelay: TimeSpan;

        private _grid: Graphics.Grid;
        private _staticMap: boolean;
        private _mapCache: HTMLCanvasElement;
        private _mapCacheContext: CanvasRenderingContext2D;
        private _mappings: number[][];
        private _onTileLoad: EventHandler2<Assets.ITileDetails, number>;
        private _onLoaded: EventHandler;
        private _loaded: boolean;
        private _tilesBuilt: number;
        private _totalTiles: number;

        /**
        * Creates a new instance of the SquareTileMap object.
        * @param x Initial horizontal location of the tile map.
        * @param y Initial vertical location of the tile map.
        * @param tileWidth The width of the tile map tiles (this cannot change after construction).
        * @param tileHeight The height of the tile map tiles (this cannot change after construction).
        * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
        * @param mappings A two dimensional array numbers that map directly to the resources array to define the square tile map (this cannot change after construction).
        */
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][]);
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
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean);
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
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean, drawGridLines: boolean);
        constructor(x: number, y: number, tileWidth: number, tileHeight: number, resources: Graphics.ImageSource[], mappings: number[][], staticMap: boolean = true, drawGridLines: boolean = false) {
            super(x, y, resources);

            this._mappings = mappings;
            this._grid = new Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
            this._staticMap = staticMap;
            this._onTileLoad = new EventHandler2<Assets.ITileDetails, number>();
            this._onLoaded = new EventHandler();
            this._loaded = false;
            this._tilesBuilt = 0;
            this._totalTiles = this._grid.Rows * this._grid.Columns;
            this.TileLoadDelay = TimeSpan.Zero;
            this.RowLoadDelay = TimeSpan.Zero;

            if (this._staticMap) {
                this.BuildCache();
            }

            // Execute this on the next stack, to allow time for binding to the tile maps load events
            setTimeout(() => {
                this.FillGridWith(mappings, () => {
                    this._loaded = true;
                    this._onLoaded.Trigger();
                });
            }, 0);
        }

        /**
        * Gets an event that is triggered when a tile has been loaded, first argument is the tile details for the loaded tile, second is the percent complete.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnTileLoad(): EventHandler2<Assets.ITileDetails, number> {
            return this._onTileLoad;
        }

        /**
        * Gets an event that is triggered when the square tile map has been loaded.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
        */
        public get OnLoaded(): EventHandler {            
            return this._onLoaded;
        }

        /**
        * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
        * @param imageSource The sprite sheet to extract the tile resources from.
        * @param tileWidth The width of the sprite sheet tiles.
        * @param tileHeight The height of the sprite sheet tiles.
        */
        public static ExtractTiles(imageSource: Graphics.ImageSource, tileWidth: number, tileHeight: number): Graphics.ImageSource[] {
            var resources: Graphics.ImageSource[] = [],
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
        * Determines if the current SquareTileMap is loaded.
        */
        public IsLoaded(): boolean {
            return this._loaded;
        }

        /**
        * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
        * @param context The canvas context to draw the SquareTileMap onto.
        */
        public Draw(context: CanvasRenderingContext2D): void {
            //super._StartDraw(context);

            if (!this._staticMap) {
                this._grid.Draw(context);
            }
            else {
                context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
            }

            //super._EndDraw(context);
        }

        /**
        * The bounding area that represents where the SquareTileMap will draw.
        */
        public GetDrawBounds(): Bounds.Bounds2d {
            var bounds = this._grid.GetDrawBounds();

            bounds.Position = this.Position;

            return bounds;
        }

        /**
        * Removes all children and unbinds all events associated with the SquareTileMap.
        */
        public Dispose(): void {
            this._grid.Dispose();

            this._onLoaded.Dispose();
            this._onTileLoad.Dispose();
            super.Dispose();
        }

        /**
        * Returns a nearly identical copy of this SquareTileMap.  If this SquareTileMap belongs to a parent, the cloned SquareTileMap will not. If this SquareTileMap has children, all children will be cloned as well.  Lastly, the cloned SquareTileMap will not have the same event bindings as this one does.
        */
        public Clone(): SquareTileMap {
            var graphic = new SquareTileMap(this.Position.X, this.Position.Y, this._grid.TileSize.Width, this._grid.TileSize.Height, this._Resources, this._mappings);

            graphic.Opacity = this.Opacity;
            graphic.Rotation = this.Rotation;
            graphic.Visible = this.Visible;
            graphic.ZIndex = this.ZIndex;
            graphic.RowLoadDelay = this.RowLoadDelay.Clone();
            graphic.TileLoadDelay = this.TileLoadDelay.Clone();

            return graphic;
        }

        private BuildCache(): void {
            var size: Size2d = this._grid.Size,
                originalPosition = this._grid.Position;

            this._mapCache = <HTMLCanvasElement>document.createElement("canvas");
            this._mapCache.width = size.Width;
            this._mapCache.height = size.Height;
            this._mapCacheContext = this._mapCache.getContext("2d");
            this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
        }

        private CacheTile(tile: Assets.SquareTile): void {
            // Draw the tile onto the map cache
            //tile.Draw(this._mapCacheContext);
        }

        private FillGridWith(mappings: number[][], onComplete: () => any): void {
            asyncLoop((next: () => void , rowsComplete: number) => {
                this.AsyncBuildGridRow(rowsComplete, mappings, () => {
                    next();
                });
            }, mappings.length, () => {
                    onComplete();
                });
        }

        private AsyncBuildGridTile(row: number, column: number, resourceIndex: number, onComplete: (tile: Assets.SquareTile) => any): void {
            var action = () => {
                var tile: Assets.SquareTile,
                    tileGraphic: Graphics.ImageSource = this._Resources[resourceIndex];

                tile = new Assets.SquareTile(tileGraphic, this._grid.TileSize.Width, this._grid.TileSize.Height);

                this._grid.Fill(row, column, tile);

                this.OnTileLoad.Trigger({
                    Tile: tile,
                    Row: row,
                    Column: column,
                    ResourceIndex: resourceIndex,
                    Parent: this
                }, this._tilesBuilt / this._totalTiles);

                if (this._staticMap) {
                    this.CacheTile(tile);
                }

                onComplete(tile);
            };

            if (this.TileLoadDelay.Milliseconds > 0) {
                setTimeout(action, this.TileLoadDelay.Milliseconds);
            }
            else {
                action();
            }
        }

        // Only pretend async in order to free up the DOM
        private AsyncBuildGridRow(rowIndex: number, mappings: number[][], onComplete: () => any): void {
            setTimeout(() => {
                asyncLoop((next: () => void , tilesLoaded: number) => {
                    this._tilesBuilt++;

                    if (mappings[rowIndex][tilesLoaded] >= 0) {
                        this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], (tile: Assets.SquareTile) => {
                            next();
                        });
                    }
                    else {
                        next();
                    }
                }, mappings[rowIndex].length, () => {
                        onComplete();
                    });
            }, this.RowLoadDelay.Milliseconds);
        }
    }

}