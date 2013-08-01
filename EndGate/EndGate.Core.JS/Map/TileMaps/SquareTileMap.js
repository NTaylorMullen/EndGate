var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
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
    (function (Map) {
        /**
        * Defines a structure that is proficient at creating diverse tile maps based off of a resource image.  Best drawn via a SceneryHandler.
        */
        var SquareTileMap = (function (_super) {
            __extends(SquareTileMap, _super);
            function SquareTileMap(x, y, tileWidth, tileHeight, resources, mappings, staticMap, drawGridLines) {
                if (typeof staticMap === "undefined") { staticMap = true; }
                if (typeof drawGridLines === "undefined") { drawGridLines = false; }
                var _this = this;
                _super.call(this, x, y, resources);

                this._grid = new EndGate.Graphics.Grid(0, 0, mappings.length, mappings[0].length, tileWidth, tileHeight, drawGridLines);
                this._staticMap = staticMap;
                this._onTileLoad = new EndGate.EventHandler2();
                this._onLoaded = new EndGate.EventHandler();
                this._loaded = false;
                this._tilesBuilt = 0;
                this._totalTiles = this._grid.Rows * this._grid.Columns;
                this.TileLoadDelay = EndGate.TimeSpan.Zero;
                this.RowLoadDelay = EndGate.TimeSpan.Zero;

                if (this._staticMap) {
                    this.BuildCache();
                }

                // Execute this on the next stack, to allow time for binding to the tile maps load events
                setTimeout(function () {
                    _this.FillGridWith(mappings, function () {
                        _this._loaded = true;
                        _this._onLoaded.Trigger();
                    });
                }, 0);
            }
            Object.defineProperty(SquareTileMap.prototype, "OnTileLoad", {
                get: /**
                * Gets an event that is triggered when a tile has been loaded, first argument is the tile details for the loaded tile, second is the percent complete.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    return this._onTileLoad;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(SquareTileMap.prototype, "OnLoaded", {
                get: /**
                * Gets an event that is triggered when the square tile map has been loaded.  Once this SquareTileMap has been created and all tiles loaded this event will no longer be triggered. Functions can be bound or unbound to this event to be executed when the event triggers.
                */
                function () {
                    this._grid.Dispose();

                    this.OnTileLoad.Dispose();
                    this.OnLoaded.Dispose();

                    return this._onLoaded;
                },
                enumerable: true,
                configurable: true
            });

            SquareTileMap.ExtractTiles = /**
            * Helper function used to take a SpriteSheet image and create a one dimensional resource tile array.
            * @param imageSource The sprite sheet to extract the tile resources from.
            * @param tileWidth The width of the sprite sheet tiles.
            * @param tileHeight The height of the sprite sheet tiles.
            */
            function (imageSource, tileWidth, tileHeight) {
                var resources = [], framesPerRow = Math.floor(imageSource.ClipSize.Width / tileWidth), rows = Math.floor(imageSource.ClipSize.Height / tileHeight);

                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < framesPerRow; j++) {
                        resources.push(imageSource.Extract(j * tileWidth, i * tileHeight, tileWidth, tileHeight));
                    }
                }

                return resources;
            };

            /**
            * Determines if the current SquareTileMap is loaded.
            */
            SquareTileMap.prototype.IsLoaded = function () {
                return this._loaded;
            };

            /**
            * Draws the SquareTileMap onto the given context.  If the SquareTileMap is part of a Scene2d or SceneryHandler the Draw function will be called automatically.
            * @param context The canvas context to draw the SquareTileMap onto.
            */
            SquareTileMap.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._staticMap) {
                    this._grid.Draw(context);
                } else {
                    context.drawImage(this._mapCache, -this._mapCache.width / 2, -this._mapCache.height / 2);
                }

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the SquareTileMap will draw.
            */
            SquareTileMap.prototype.GetDrawBounds = function () {
                var bounds = this._grid.GetDrawBounds();

                bounds.Position = this.Position;

                return bounds;
            };

            /**
            * Removes all children and unbinds all events associated with the SquareTileMap.
            */
            SquareTileMap.prototype.Dispose = function () {
                this._onLoaded.Dispose();
                this._onTileLoad.Dispose();
                _super.prototype.Dispose.call(this);
            };

            SquareTileMap.prototype.BuildCache = function () {
                var size = this._grid.Size, originalPosition = this._grid.Position;

                this._mapCache = document.createElement("canvas");
                this._mapCache.width = size.Width;
                this._mapCache.height = size.Height;
                this._mapCacheContext = this._mapCache.getContext("2d");
                this._mapCacheContext.translate(size.HalfWidth, size.HalfHeight);
            };

            SquareTileMap.prototype.CacheTile = function (tile) {
                // Draw the tile onto the map cache
                tile.Draw(this._mapCacheContext);
            };

            SquareTileMap.prototype.FillGridWith = function (mappings, onComplete) {
                var _this = this;
                asyncLoop(function (next, rowsComplete) {
                    _this.AsyncBuildGridRow(rowsComplete, mappings, function () {
                        next();
                    });
                }, mappings.length, function () {
                    onComplete();
                });
            };

            SquareTileMap.prototype.AsyncBuildGridTile = function (row, column, resourceIndex, onComplete) {
                var _this = this;
                var action = function () {
                    var tile, tileGraphic = _this._Resources[resourceIndex];

                    tile = new Map.SquareTile(tileGraphic, _this._grid.TileSize.Width, _this._grid.TileSize.Height);

                    _this._grid.Fill(row, column, tile);

                    _this.OnTileLoad.Trigger({
                        Tile: tile,
                        Row: row,
                        Column: column,
                        ResourceIndex: resourceIndex,
                        Parent: _this
                    }, _this._tilesBuilt / _this._totalTiles);

                    if (_this._staticMap) {
                        _this.CacheTile(tile);
                    }

                    onComplete(tile);
                };

                if (this.TileLoadDelay.Milliseconds > 0) {
                    setTimeout(action, this.TileLoadDelay.Milliseconds);
                } else {
                    action();
                }
            };

            // Only pretend async in order to free up the DOM
            SquareTileMap.prototype.AsyncBuildGridRow = function (rowIndex, mappings, onComplete) {
                var _this = this;
                setTimeout(function () {
                    asyncLoop(function (next, tilesLoaded) {
                        _this._tilesBuilt++;

                        if (mappings[rowIndex][tilesLoaded] >= 0) {
                            _this.AsyncBuildGridTile(rowIndex, tilesLoaded, mappings[rowIndex][tilesLoaded], function (tile) {
                                next();
                            });
                        } else {
                            next();
                        }
                    }, mappings[rowIndex].length, function () {
                        onComplete();
                    });
                }, this.RowLoadDelay.Milliseconds);
            };
            return SquareTileMap;
        })(Map.TileMap);
        Map.SquareTileMap = SquareTileMap;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
