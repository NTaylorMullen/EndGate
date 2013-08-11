/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var RawRPG;
(function (RawRPG) {
    var LoadMapHandler = (function () {
        function LoadMapHandler(gameScene, centerPosition, defaultRows, defaultColumns, defaultTileSize, spriteSheetUrl, defaultLayer) {
            var savedMaps = $("#savedMaps"), loadMap = $("#loadMap"), strMaps = localStorage.getItem("mapBuilder"), maps, activeTileMaps = [];

            if (strMaps && strMaps.length > 0) {
                maps = JSON.parse(strMaps);
            } else {
                maps = {};
            }

            //Create our default map
            maps["Default"] = {
                Rows: defaultRows,
                Columns: defaultColumns,
                TileSize: defaultTileSize,
                SpriteSheetUrl: spriteSheetUrl,
                Layers: [
                    {
                        Name: "Default",
                        Layer: defaultLayer
                    }
                ]
            };

            for (var saveName in maps) {
                savedMaps.append($("<option value='" + saveName + "'>" + saveName + "</option>"));
                loadMap.removeClass("disabled");
            }

            // Set the select to have the default map selected
            savedMaps.val("Default");

            // Will load currently selected map when clicked
            loadMap.click(function () {
                for (var i = 0; i < activeTileMaps.length; i++) {
                    gameScene.Remove(activeTileMaps[i]);
                }

                activeTileMaps = [];

                // Get settings for selected map
                var settings = maps[savedMaps.val()], resourceSheet = new eg.Graphics.ImageSource(settings.SpriteSheetUrl);

                // It takes time to load an image so we have this OnLoaded function that will trigger when the image has finished loading
                resourceSheet.OnLoaded.Bind(function () {
                    // Build the resources array based on the new sprite sheet
                    var resources = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, settings.TileSize.Width, settings.TileSize.Height), tileMap;

                    for (var i = 0; i < settings.Layers.length; i++) {
                        tileMap = new eg.Map.SquareTileMap(centerPosition.X, centerPosition.Y, settings.TileSize.Width, settings.TileSize.Height, resources, settings.Layers[i].Layer);
                        activeTileMaps.push(tileMap);
                        gameScene.Add(tileMap);
                    }
                });
            });

            // This will load the default map
            loadMap.click();
        }
        return LoadMapHandler;
    })();
    RawRPG.LoadMapHandler = LoadMapHandler;
})(RawRPG || (RawRPG = {}));
//@ sourceMappingURL=LoadMapHandler.js.map
