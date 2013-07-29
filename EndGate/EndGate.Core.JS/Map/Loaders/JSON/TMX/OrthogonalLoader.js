var EndGate;
(function (EndGate) {
    (function (Map) {
        (function (Loaders) {
            (function (_) {
                /// <reference path="../../../../Graphics/ImageSource.ts" />
                /// <reference path="../../IMapLoader.ts" />
                /// <reference path="../../IMapLoadedResult.ts" />
                /// <reference path="../../IMapPreloadInfo.ts" />
                /// <reference path="../../IHookFunction.ts" />
                /// <reference path="../../../TileMaps/SquareTileMap.ts" />
                /// <reference path="../../../TileMaps/ITileDetails.ts" />
                /// <reference path="../../../../Assets/TimeSpan.ts" />
                /// <reference path="../../../../Extensions/Helpers.ts" />
                /// <reference path="../../../../Utilities/EventHandler1.ts" />
                /// <reference path="ITMX.ts" />
                /// <reference path="ITMXTileset.ts" />
                (function (TMX) {
                    var OrthogonalLoader = (function () {
                        function OrthogonalLoader() {
                        }
                        OrthogonalLoader.prototype.Load = function (data, propertyHooks, onComplete) {
                            var _this = this;
                            // We're initially at 0%.
                            var percent = 0, tileCount = 0, onPartialLoad = new EndGate.EventHandler1();

                            // Load all the sources referenced within the data
                            this.LoadTilesetSources(data.tilesets, function (tileset) {
                                percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax;

                                onPartialLoad.Trigger(percent);
                            }, function (tilesetSources) {
                                // Triggered once all the sources have completed loading
                                // All the tiles extracted represent our resource list
                                var resources = _this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks), mappings, layers = new Array(), layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                                percent = OrthogonalLoader._imagePercentMax;

                                asyncLoop(function (next, i) {
                                    if (data.layers[i].type !== "tilelayer") {
                                        throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                                    }

                                    _this.AsyncBuildLayer(data, i, propertyHooks, resources, function (details, percentLoaded) {
                                        onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                                    }, function (layer) {
                                        percent += layerPercentValue;

                                        onPartialLoad.Trigger(percent);

                                        layers.push(layer);

                                        next();
                                    });
                                }, data.layers.length, function () {
                                    // All layers loaded
                                    onComplete({
                                        Layers: layers
                                    });
                                });
                            });

                            for (var i = 0; i < data.layers.length; i++) {
                                tileCount += data.layers[i].data.length;
                            }

                            return {
                                TileCount: tileCount,
                                LayerCount: data.layers.length,
                                ResourceSheetCount: data.tilesets.length,
                                OnPercentLoaded: onPartialLoad
                            };
                        };

                        OrthogonalLoader.prototype.LoadTilesetSources = function (tilesets, onTilesetLoad, onComplete) {
                            var tilesetSources = {}, loadedCount = 0, onLoaded = function (source) {
                                onTilesetLoad(source);

                                if (++loadedCount === tilesets.length) {
                                    onComplete(tilesetSources);
                                }
                            };

                            for (var i = 0; i < tilesets.length; i++) {
                                tilesetSources[tilesets[i].name] = new EndGate.Graphics.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
                            }
                        };

                        OrthogonalLoader.prototype.ExtractTilesetTiles = function (tilesets, tilesetSources, propertyHooks) {
                            var tilesetTiles = new Array(), resourceHooks = new Array(), sources, index;

                            tilesets.sort(function (a, b) {
                                return a.firstgid - b.firstgid;
                            });

                            for (var i = 0; i < tilesets.length; i++) {
                                sources = Map.SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);

                                for (var property in tilesets[i].properties) {
                                    if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                                        for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                                            if (typeof resourceHooks[j] === "undefined") {
                                                resourceHooks[j] = new Array();
                                            }

                                            resourceHooks[j].push(this.BuildHookerFunction(tilesets[i].properties[property], propertyHooks.ResourceSheetHooks[property]));
                                        }
                                    }
                                }

                                for (var tileIndex in tilesets[i].tileproperties) {
                                    for (var property in tilesets[i].tileproperties[tileIndex])
                                        if (typeof propertyHooks.ResourceTileHooks[property] !== "undefined") {
                                            index = parseInt(tileIndex) + tilesets[i].firstgid - 1;

                                            if (typeof resourceHooks[index] === "undefined") {
                                                resourceHooks[index] = new Array();
                                            }

                                            resourceHooks[index].push(this.BuildHookerFunction(tilesets[i].tileproperties[tileIndex][property], propertyHooks.ResourceTileHooks[property]));
                                        }
                                }

                                tilesetTiles = tilesetTiles.concat(sources);
                            }

                            return {
                                Resources: tilesetTiles,
                                ResourceHooks: resourceHooks
                            };
                        };

                        // Not true async but it frees up the DOM
                        OrthogonalLoader.prototype.AsyncBuildLayer = function (tmxData, layerIndex, propertyHooks, resources, onTileLoad, onComplete) {
                            var _this = this;
                            setTimeout(function () {
                                // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                                var tmxLayer = tmxData.layers[layerIndex], mappings = _this.NormalizeLayerData(tmxLayer.data, tmxData.width), layer = new Map.SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings), layerHooks = new Array();

                                for (var property in tmxLayer.properties) {
                                    if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                                        layerHooks.push(_this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                                    }
                                }

                                layer.ZIndex = layerIndex;
                                layer.Visible = tmxLayer.visible;
                                layer.Opacity = tmxLayer.opacity;

                                // Enough delay to ensure that the page doesn't freeze
                                layer.RowLoadDelay = EndGate.TimeSpan.FromMilliseconds(5);

                                layer.OnTileLoad.Bind(function (details, percentComplete) {
                                    if (resources.ResourceHooks[details.ResourceIndex]) {
                                        for (var i = 0; i < resources.ResourceHooks[details.ResourceIndex].length; i++) {
                                            resources.ResourceHooks[details.ResourceIndex][i](details);
                                        }
                                    }

                                    for (var i = 0; i < layerHooks.length; i++) {
                                        layerHooks[i](details);
                                    }

                                    onTileLoad(details, percentComplete);
                                });

                                layer.OnLoaded.Bind(function () {
                                    onComplete(layer);
                                });
                            }, 0);
                        };

                        OrthogonalLoader.prototype.BuildHookerFunction = function (propertyValue, fn) {
                            return function (details) {
                                return fn(details, propertyValue);
                            };
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
                        OrthogonalLoader._imagePercentMax = .2;
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
