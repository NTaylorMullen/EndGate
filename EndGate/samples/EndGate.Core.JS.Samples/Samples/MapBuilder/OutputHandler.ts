/// <reference path="../../Scripts/endgate.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="PersistenceManager.ts" />
/// <reference path="SpriteSheetViewer.ts" />

class OutputHandler {
    constructor(utilities: JQuery, persistenceManager: PersistenceManager, spriteSheetViewer: SpriteSheetViewer, tileWidth: number, tileHeight: number) {
        var output: JQuery = utilities.find("#output"),
            outputOptions: JQuery = utilities.find("#outputOptions"),
            outputPanel: JQuery = $("#outputPanel"),
            outputString;

        output.click(() => {
            if (outputOptions.val() === "0") {
                persistenceManager.SaveMap("_output", "_");

                outputString = localStorage.getItem("_");                
            }
            else if (outputOptions.val() === "1") {
                var resourceMappings = persistenceManager.BuildResourceMaps();

                outputString =
                'class MyGame extends eg.Game {}<br /><br />' +
                'var myGame = new MyGame(),<br />' +
                '   resourceSheet = new eg.Graphics.Assets.ImageSource("' + spriteSheetViewer.SpriteSheetUrl + '", ' + spriteSheetViewer.ActiveSpriteSheet.Size.Width + ', ' + spriteSheetViewer.ActiveSpriteSheet.Size.Height + '),<br />' +
                '   resources: eg.Graphics.Assets.ImageSource[] = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, ' + tileWidth + ', ' + tileHeight + '),<br />' +
                '   layers: eg.Map.SquareTileMap[] = [<br />';

                for (var i = 0; i < resourceMappings.length; i++) {
                    if (i > 0) {
                        outputString += ', <br />';
                    }

                    outputString += 'new eg.Map.SquareTileMap(0,0,' + tileWidth + ', ' + tileHeight + ', resources, ' +JSON.stringify(resourceMappings[i].Layer) + ')';
                }

                outputString += '<br />]; <br /><br />' +
                    'for (var i = 0; i < layers.length; i++) {<br />' +
                    '   myGame.Map.Scenery.AddLayer(layers[i]);<br />' +
                    '}<br />';
            }

            outputPanel.html(outputString);
            output.blur();
            outputOptions.blur();
            window.scrollTo(0, document.body.scrollHeight);

            $("#blockWrapper").height($("#builderPane").height());
        });
    }

}