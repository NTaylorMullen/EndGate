var LoadMapHandler = (function () {
    function LoadMapHandler(sceneryHandler, centerPosition, defaultRows, defaultColumns, defaultTileSize, spriteSheetUrl, defaultLayer) {
        var savedMaps = $("#savedMaps"), loadMap = $("#loadMap"), strMaps = localStorage.getItem("mapBuilder"), maps, activeTileMaps = [];
        if(strMaps && strMaps.length > 0) {
            maps = JSON.parse(strMaps);
        } else {
            maps = {
            };
        }
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
        for(var saveName in maps) {
            savedMaps.append($("<option value='" + saveName + "'>" + saveName + "</option>"));
            loadMap.removeClass("disabled");
        }
        savedMaps.val("Default");
        loadMap.click(function () {
            for(var i = 0; i < activeTileMaps.length; i++) {
                sceneryHandler.RemoveLayer(activeTileMaps[i]);
            }
            activeTileMaps = [];
            var settings = maps[savedMaps.val()], resourceSheet = new eg.Graphics.Assets.ImageSource("images/wood_tileset_3.png");
            resourceSheet.OnLoaded.Bind(function () {
                var resources = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, settings.TileSize.Width, settings.TileSize.Height), tileMap;
                for(var i = 0; i < settings.Layers.length; i++) {
                    tileMap = new eg.Map.SquareTileMap(centerPosition.X, centerPosition.Y, settings.TileSize.Width, settings.TileSize.Height, resources, settings.Layers[i].Layer);
                    activeTileMaps.push(tileMap);
                    sceneryHandler.AddLayer(tileMap);
                }
            });
        });
        loadMap.click();
    }
    return LoadMapHandler;
})();
//@ sourceMappingURL=LoadMapHandler.js.map
