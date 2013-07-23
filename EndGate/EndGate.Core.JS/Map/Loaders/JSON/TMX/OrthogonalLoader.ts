/// <reference path="../../../../Graphics/Sprites/ImageSource.ts" />
/// <reference path="../../IMapLoader.ts" />
/// <reference path="../../IMapLoadedResult.ts" />
/// <reference path="../../../TileMaps/SquareTileMap.ts" />
/// <reference path="ITMX.ts" />
/// <reference path="ITMXTileset.ts" />

module EndGate.Map.Loaders._.TMX {

    export class OrthogonalLoader implements IMapLoader {
        public Load(data: ITMX, onComplete: (result: IMapLoadedResult) => any): void {
            // Load all the sources referenced within the data
            this.LoadTilesetSources(data.tilesets, (tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource }) => {
                // Triggered once all the sources have completed loading

                // All the tiles extracted represent our resource list
                var resources: Array<Graphics.Assets.ImageSource> = this.ExtractTilesetTiles(data.tilesets, tilesetSources),
                    mappings: Array<Array<number>>,
                    layer: SquareTileMap,
                    layers: Array<SquareTileMap> = new Array<SquareTileMap>();

                for (var i = 0; i < data.layers.length; i++) {
                    if (data.layers[i].type !== "tilelayer") {
                        throw new Error("Invalid layer type.  The layer type '" + data.layers[i].type + "' is not supported.");
                    }

                    // Convert the layer data to a 2 dimensional array and subtract 1 from all the data points (to make it 0 based)
                    mappings = this.NormalizeLayerData(data.layers[i].data, data.width);

                    layer = new SquareTileMap(data.layers[i].x, data.layers[i].y, data.tilewidth, data.tileheight, resources, mappings);
                    layer.ZIndex = i;
                    layer.Visible = data.layers[i].visible;
                    layer.Opacity = data.layers[i].opacity;
                    layers.push(layer);
                }

                onComplete({
                    Layers: layers
                });
            });
        }

        private LoadTilesetSources(tilesets: Array<ITMXTileset>, onComplete: (tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource }) => any): void {
            var tilesetSources: { [tilesetName: string]: Graphics.Assets.ImageSource } = {},
                loadedCount: number = 0,
                onLoaded = (source: Graphics.Assets.ImageSource) => {
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