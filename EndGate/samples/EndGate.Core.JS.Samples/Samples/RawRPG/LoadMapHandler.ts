/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.d.ts" />

// Wrap in module to keep code out of global scope
module RawRPG {

    // These two interfaces are pulled directly from the MapBuilder sample
    export interface ILayerMap {
        Layer: number[][];
        Name: string;
    }

    export interface ISettings {
        Rows: number;
        Columns: number;
        TileSize: eg.Size2d;
        SpriteSheetUrl: string;
        Layers: ILayerMap[];
    }

    export class LoadMapHandler {
        constructor(sceneryHandler: eg.Map.SceneryHandler, centerPosition: eg.Vector2d, defaultRows: number, defaultColumns: number, defaultTileSize: eg.Size2d, spriteSheetUrl: string, defaultLayer: number[][]) {
            var savedMaps: JQuery = $("#savedMaps"),
                loadMap: JQuery = $("#loadMap"),
                // Grab any saved maps from local storage
                strMaps = localStorage.getItem("mapBuilder"),
                maps: { [name: string]: ISettings; },
                activeTileMaps: eg.Map.SquareTileMap[] = [];

            // If there are saved maps parse them out into an appropriate JS object
            if (strMaps && strMaps.length > 0) {
                maps = JSON.parse(strMaps);
            }
            else {
                maps = {};
            }

            //Create our default map
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

            // Build out the select
            for (var saveName in maps) {
                savedMaps.append($("<option value='" + saveName + "'>" + saveName + "</option>"));
                loadMap.removeClass("disabled");
            }

            // Set the select to have the default map selected
            savedMaps.val("Default");

            // Will load currently selected map when clicked
            loadMap.click(() => {
                // Unload layers from scene
                for (var i = 0; i < activeTileMaps.length; i++) {
                    sceneryHandler.RemoveLayer(activeTileMaps[i]);
                }

                activeTileMaps = [];

                // Get settings for selected map
                var settings = maps[savedMaps.val()],
                    // Build a sprite sheet from the sprite sheet url that was saved
                    resourceSheet: eg.Graphics.Assets.ImageSource = new eg.Graphics.Assets.ImageSource(settings.SpriteSheetUrl);

                // It takes time to load an image so we have this OnLoaded function that will trigger when the image has finished loading
                resourceSheet.OnLoaded.Bind(() => {
                    // Build the resources array based on the new sprite sheet
                    var resources: eg.Graphics.Assets.ImageSource[] = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, settings.TileSize.Width, settings.TileSize.Height),
                        tileMap: eg.Map.SquareTileMap;

                    // Generate the layers and add them to the scenery
                    for (var i = 0; i < settings.Layers.length; i++) {
                        tileMap = new eg.Map.SquareTileMap(centerPosition.X, centerPosition.Y, settings.TileSize.Width, settings.TileSize.Height, resources, settings.Layers[i].Layer);
                        activeTileMaps.push(tileMap);
                        sceneryHandler.AddLayer(tileMap);
                    }
                });
            });

            // This will load the default map
            loadMap.click();
        }
    }

}