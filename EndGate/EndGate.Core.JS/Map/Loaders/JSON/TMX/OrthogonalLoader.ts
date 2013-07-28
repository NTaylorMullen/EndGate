/// <reference path="../../../../Graphics/Sprites/ImageSource.ts" />
/// <reference path="../../IMapLoader.ts" />
/// <reference path="../../IMapLoadedResult.ts" />
/// <reference path="../../IMapPreloadInfo.ts" />
/// <reference path="../../../TileMaps/SquareTileMap.ts" />
/// <reference path="../../../../Assets/TimeSpan.ts" />
/// <reference path="../../../../Extensions/Helpers.ts" />
/// <reference path="../../../../Utilities/EventHandler1.ts" />
/// <reference path="ITMX.ts" />
/// <reference path="ITMXTileset.ts" />

module EndGate.Map.Loaders._.TMX {

    export class OrthogonalLoader implements IMapLoader {
        private static _imagePercentMax: number = .2;

        public Load(data: ITMX, onComplete: (result: IMapLoadedResult) => any): IMapPreloadInfo {
            // We're initially at 0%.
            var percent = 0,
                tileCount = 0,
                onPartialLoad: EventHandler1<number> = new EventHandler1<number>();

            // Load all the sources referenced within the data
            this.LoadTilesetSources(data.tilesets,
                (tileset: Graphics.Assets.ImageSource) => {
                    percent += (1 / data.tilesets.length) * OrthogonalLoader._imagePercentMax

                    onPartialLoad.Trigger(percent);
                },
                (tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource }) => {
                    // Triggered once all the sources have completed loading

                    // All the tiles extracted represent our resource list
                    var resources: Array<Graphics.Assets.ImageSource> = this.ExtractTilesetTiles(data.tilesets, tilesetSources),
                        mappings: Array<Array<number>>,
                        layers: Array<SquareTileMap> = new Array<SquareTileMap>(),
                        layerPercentValue = (1 - OrthogonalLoader._imagePercentMax) / data.layers.length;

                    percent = OrthogonalLoader._imagePercentMax;

                    asyncLoop((next: () => void , i: number) => {
                        if (data.layers[i].type !== "tilelayer") {
                            throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                        }

                        this.AsyncBuildLayer(data, i, resources,
                            (tile: SquareTile, percentLoaded: number) => {
                                onPartialLoad.Trigger(percent + percentLoaded * layerPercentValue);
                            },
                            (layer: SquareTileMap) => {
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

        private LoadTilesetSources(tilesets: Array<ITMXTileset>, onTilesetLoad: (tileset: Graphics.Assets.ImageSource) => any, onComplete: (tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource }) => any): void {
            var tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource } = {},
                loadedCount: number = 0,
                onLoaded = (source: Graphics.Assets.ImageSource) => {
                    onTilesetLoad(source);
                    // If everything has loaded
                    if (++loadedCount === tilesets.length) {
                        onComplete(tilesetSources);
                    }
                };

            for (var i = 0; i < tilesets.length; i++) {
                tilesetSources[tilesets[i].name] = new Graphics.Assets.ImageSource(tilesets[i].image, tilesets[i].imagewidth, tilesets[i].imageheight);
                tilesetSources[tilesets[i].name].OnLoaded.Bind(onLoaded);
            }
        }

        private ExtractTilesetTiles(tilesets: Array<ITMXTileset>, tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource }): Array<Graphics.Assets.ImageSource> {
            var tilesetTiles: Array<Graphics.Assets.ImageSource> = new Array<Graphics.Assets.ImageSource>();

            tilesets.sort((a: ITMXTileset, b: ITMXTileset) => { return a.firstgid - b.firstgid; });

            for (var i = 0; i < tilesets.length; i++) {
                tilesetTiles = tilesetTiles.concat(SquareTileMap.ExtractTiles(tilesetSources[tilesets[i].name], tilesets[i].tilewidth, tilesets[i].tileheight));
            }

            return tilesetTiles;
        }

        // Not true async but it frees up the DOM
        private AsyncBuildLayer(tmxData: ITMX, layerIndex: number, resources: Array<Graphics.Assets.ImageSource>, onTileLoad: (squareTile: SquareTile, percentComplete: number) => any, onComplete: (squareTileMap: SquareTileMap) => any): void {
            setTimeout(() => {
                // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                var tmxLayer = tmxData.layers[layerIndex],
                    mappings = this.NormalizeLayerData(tmxLayer.data, tmxData.width),
                    layer = new SquareTileMap(tmxLayer.x, tmxLayer.y, tmxData.tilewidth, tmxData.tileheight, resources, mappings);

                layer.ZIndex = layerIndex;
                layer.Visible = tmxLayer.visible;
                layer.Opacity = tmxLayer.opacity;

                // Enough delay to ensure that the page doesn't freeze
                layer.RowLoadDelay = TimeSpan.FromMilliseconds(5);

                layer.OnTileLoad.Bind((tile: SquareTile, percentComplete: number) => {
                    onTileLoad(tile, percentComplete);
                });

                layer.OnLoaded.Bind(() => {
                    onComplete(layer);
                });
            }, 0);
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