/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.ts" />

interface ILayerMap {
    Layer: number[][];
    Name: string;
}

interface ISettings {
    Rows: number;
    Columns: number;
    TileSize: eg.Size2d;
    SpriteSheetUrl: string;
    Layers: ILayerMap[];
}

class LoadMapHandler {
    constructor(sceneryHandler: eg.Map.SceneryHandler, centerPosition: eg.Vector2d, defaultRows: number, defaultColumns: number, defaultTileSize: eg.Size2d, spriteSheetUrl: string, defaultLayer: number[][]) {
        var savedMaps: JQuery = $("#savedMaps"),
            loadMap: JQuery = $("#loadMap"),
            strMaps = localStorage.getItem("mapBuilder"),
            maps: { [name: string]: ISettings; },
            activeTileMaps: eg.Map.SquareTileMap[] = [];

        if (strMaps.length > 0) {
            maps = JSON.parse(strMaps);
        }
        else {
            maps = {};
        }

        maps["Default"] = {
            Rows: defaultRows,
            Columns: defaultColumns,
            TileSize: defaultTileSize,
            SpriteSheetUrl: spriteSheetUrl,
            Layers: [{
                Name: "Default",
                Layer: defaultLayer
            }]
        };

        for (var saveName in maps) {
            savedMaps.append($("<option value='" + saveName + "'>" + saveName + "</option>"));
            loadMap.removeClass("disabled");
        }

        savedMaps.val("Default");

        loadMap.click(() => {
            for (var i = 0; i < activeTileMaps.length; i++) {
                sceneryHandler.RemoveLayer(activeTileMaps[i]);
            }

            activeTileMaps = [];

            var settings = maps[savedMaps.val()],
                resourceSheet: eg.Graphics.Assets.ImageSource = new eg.Graphics.Assets.ImageSource("images/wood_tileset_3.png");

            resourceSheet.OnLoaded.Bind(() => {
                var resources: eg.Graphics.Assets.ImageSource[] = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, settings.TileSize.Width, settings.TileSize.Height),
                    tileMap: eg.Map.SquareTileMap;

                for (var i = 0; i < settings.Layers.length; i++) {
                    tileMap = new eg.Map.SquareTileMap(centerPosition.X, centerPosition.Y, settings.TileSize.Width, settings.TileSize.Height, resources, settings.Layers[i].Layer);
                    activeTileMaps.push(tileMap);
                    sceneryHandler.AddLayer(tileMap);
                }
            });
        });

        loadMap.click();
    }
}