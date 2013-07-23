var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            (function (_) {
                /// <reference path="../../../../Graphics/Sprites/ImageSource.ts" />
                /// <reference path="../../IMapLoader.ts" />
                /// <reference path="../../IMapLoadedResult.ts" />
                /// <reference path="../../../TileMaps/SquareTileMap.ts" />
                /// <reference path="ITMX.ts" />
                /// <reference path="ITMXTileset.ts" />
                (function (TMX) {
                    var OrthogonalLoader = (function () {
                        function OrthogonalLoader() {
                        }
                        OrthogonalLoader.prototype.Load = function (data, onComplete) {
                            var _this = this;
                            // Load all the sources referenced within the data
                            this.LoadTilesetSources(data.tilesets, function (tilesetSources) {
                                // Triggered once all the sources have completed loading
                                // All the tiles extracted represent our resource list
                                var resources = _this.ExtractTilesetTiles(data.tilesets, tilesetSources), mappings, layer, layers = new Array();

                                for (var i = 0; i < data.layers.length; i++) {
                                    if (data.layers[i].type !== "tilelayer") {
                                        throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                                    }

                                    // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                                    mappings = _this.NormalizeLayerData(data.layers[i].data, data.width);

                                    layer = new Map.SquareTileMap(data.layers[i].x, data.layers[i].y, data.tilewidth, data.tileheight, resources, mappings);
                                    layer.ZIndex = i;
                                    layer.Visible = data.layers[i].visible;
                                    layer.Opacity = data.layers[i].opacity;
                                    layers.push(layer);
                                }

                                onComplete({
                                    Layers: layers
                                });
                            });
                        };

                        OrthogonalLoader.prototype.LoadTilesetSources = function (tilesets, onComplete) {
                            var tilesetSources = {}, loadedCount = 0, onLoaded = function (source) {
                                if (++loadedCount === tilesets.length) {
                                    onComplete(tilesetSources);
                                }
                            };

                            for (var i = 0; i < tilesets.length; i++) {
                                tilesetSources[tilesets[i].name] = new EndGate.Graphics.Assets.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
                            }
                        };

                        OrthogonalLoader.prototype.ExtractTilesetTiles = function (tilesets, tilesetSources) {
                            var tilesetTiles = new Array();

                            tilesets.sort(function (a, b) {
                                return a.firstgid - b.firstgid;
                            });

                            for (var i = 0; i < tilesets.length; i++) {
                                tilesetTiles = tilesetTiles.concat(Map.SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight));
                            }

                            return tilesetTiles;
                        };

                        OrthogonalLoader.prototype.NormalizeLayerData = function (data, columns) {
                            var normalized = new Array(), index;

                            for (var i = 0; i < data.length; i++) {
                                index = Math.floor(i / columns);

                                if (!(normalized[index] instanceof Array)) {
                                    normalized[index] = new Array();
                                }

                                // Subtract 1 because TMX format starts at 1
                                normalized[index].push(data[i] - 1);
                            }

                            return normalized;
                        };
                        return OrthogonalLoader;
                    })();
                    TMX.OrthogonalLoader = OrthogonalLoader;
                })(_.TMX || (_.TMX = {}));
                var TMX = _.TMX;
            })(Loaders._ || (Loaders._ = {}));
            var _ = Loaders._;
        })(Map.Loaders || (Map.Loaders = {}));
        var Loaders = Map.Loaders;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
