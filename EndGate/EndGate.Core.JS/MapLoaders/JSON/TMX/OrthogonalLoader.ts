/// <reference path="../../../Graphics/ImageSource.ts" />
/// <reference path="../../IMapLoader.ts" />
/// <reference path="../../IMapLoadedResult.ts" />
/// <reference path="../../IMapPreloadInfo.ts" />
/// <reference path="../../IHookFunction.ts" />
/// <reference path="../../../Graphics/TileMaps/SquareTileMap.ts" />
/// <reference path="../../../Graphics/TileMaps/ITileDetails.ts" />
/// <reference path="../../../Assets/TimeSpan.ts" />
/// <reference path="../../../Extensions/Helpers.ts" />
/// <reference path="../../../Utilities/EventHandler1.ts" />
/// <reference path="ITMX.ts" />
/// <reference path="ITMXTileset.ts" />

module EndGate.MapLoaders._.TMX {

    interface TileExtractResult {
        ResourceHooks: Array<Array<(details: Graphics.Assets.ITileDetails) => any>>;
        Resources: Array<Graphics.ImageSource>;
    }

    export class OrthogonalLoader implements IMapLoader {
        private static _imagePercentMax: number = .2;

        public Load(data: ITMX, propertyHooks: IPropertyHooks, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            // We're initially at 0%.
            var percent = 0,
                tileCount = 0,
                onPartialLoad: EventHandler1<number> = new EventHandler1<number>();

            // Load all the sources referenced within the data
            this.LoadTilesetSources(data.tilesets,
                (tileset: Graphics.ImageSource) => {
                    percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax

                    onPartialLoad.Trigger(percent);
                },
                (tilesetSources: { [tilesetName: string]: Graphics.ImageSource }) => {
                    // Triggered once all the sources have completed loading

                    // All the tiles extracted represent our resource list
                    var resources: TileExtractResult = this.ExtractTilesetTiles(data.tilesets, tilesetSources, propertyHooks),
                        mappings: Array<Array<number>>,
                        layers: Array<Graphics.SquareTileMap> = new Array<Graphics.SquareTileMap>(),
                        layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                    percent = OrthogonalLoader._imagePercentMax;

                    asyncLoop((next: () => void , i: number) => {
                        if (data.layers[i].type !== "tilelayer") {
                            throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                        }

                        this.AsyncBuildLayer(data, i, propertyHooks, resources,
                            (details: Graphics.Assets.ITileDetails, percentLoaded: number) => {
                                onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                            },
                            (layer: Graphics.SquareTileMap) => {
                                percent += layerPercentValue;

                                onPartialLoad.Trigger(percent);

                                layers.push(layer);

                                next();
                            });
                    }, data.layers.length, () => {
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
        }

        private LoadTilesetSources(tilesets: Array<ITMXTileset>, onTilesetLoad: (tileset: Graphics.ImageSource) => any, onComplete: (tilesetSources: { [tilesetName: string]: Graphics.ImageSource }) => any): void {
            var tilesetSources: { [tilesetName: string]: Graphics.ImageSource } = {},
                loadedCount: number = 0,
                onLoaded = (source: Graphics.ImageSource) => {
                    onTilesetLoad(source);
                    // If everything has loaded
                    if (++loadedCount === tilesets.length) {
                        onComplete(tilesetSources);
                    }
                };

            for (var i = 0; i < tilesets.length; i++) {
                tilesetSources[tilesets[i].name] = new Graphics.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
            }
        }

        private ExtractTilesetTiles(tilesets: Array<ITMXTileset>, tilesetSources: { [tilesetName: string]: Graphics.ImageSource }, propertyHooks: IPropertyHooks): TileExtractResult {
            var tilesetTiles: Array<Graphics.ImageSource> = new Array<Graphics.ImageSource>(),
                resourceHooks = new Array<Array<(details: Graphics.Assets.ITileDetails) => any>>(),
                sources: Array<Graphics.ImageSource>,
                index: number;

            tilesets.sort((a: ITMXTileset, b: ITMXTileset) => { return a.firstgid - b.firstgid; });

            for (var i = 0; i < tilesets.length; i++) {
                sources = Graphics.SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight);

                for (var property in tilesets[i].properties) {
                    if (typeof propertyHooks.ResourceSheetHooks[property] !== "undefined") {
                        for (var j = tilesets[i].firstgid - 1; j < tilesets[i].firstgid - 1 + sources.length; j++) {
                            if (typeof resourceHooks[j] === "undefined") {
                                resourceHooks[j] = new Array<(details: Graphics.Assets.ITileDetails) => any>();
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
                                resourceHooks[index] = new Array<(details: Graphics.Assets.ITileDetails) => any>();
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
        }

        // Not true async but it frees up the DOM
        private AsyncBuildLayer(tmxData: ITMX, layerIndex: number, propertyHooks: IPropertyHooks, resources: TileExtractResult, onTileLoad: (details: Graphics.Assets.ITileDetails, percentComplete: number) => any, onComplete: (squareTileMap: Graphics.SquareTileMap) => any): void {
            setTimeout(() => {
                // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                var tmxLayer = tmxData.layers[layerIndex],
                    mappings = this.NormalizeLayerData(tmxLayer.data, tmxData.width),
                    layer = new Graphics.SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources.Resources, mappings),
                    layerHooks: Array<(details: Graphics.Assets.ITileDetails) => any> = new Array<(details: Graphics.Assets.ITileDetails) => any>();

                for (var property in tmxLayer.properties) {
                    if (typeof propertyHooks.LayerHooks[property] !== "undefined") {
                        layerHooks.push(this.BuildHookerFunction(tmxLayer.properties[property], propertyHooks.LayerHooks[property]));
                    }
                }

                layer.ZIndex = layerIndex;
                layer.Visible = tmxLayer.visible;
                layer.Opacity = tmxLayer.opacity;

                // Enough delay to ensure that the page doesn't freeze
                layer.RowLoadDelay = TimeSpan.FromMilliseconds(5);

                layer.OnTileLoad.Bind((details: Graphics.Assets.ITileDetails, percentComplete: number) => {
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

                layer.OnLoaded.Bind(() => {
                    onComplete(layer);
                });
            }, 0);
        }

        private BuildHookerFunction(propertyValue: string, fn: IHookFunction): (details: Graphics.Assets.ITileDetails) => any {
            return (details: Graphics.Assets.ITileDetails): any => {
                return fn(details, propertyValue);
            };
        }

        private NormalizeLayerData(data: Array<number>, columns: number): Array<Array<number>> {
            var normalized: Array<Array<number>> = new Array<Array<number>>(),
                index: number;

            for (var i = 0; i < data.length; i++) {
                index = Math.floor(i / columns);

                if (!(normalized[index] instanceof Array)) {
                    normalized[index] = new Array<number>();
                }

                // Subtract 1 because TMX format starts at 1
                normalized[index].push(data[i] - 1);
            }

            return normalized;
        }
    }

}