/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="PersistenceManager.ts" />
/// <reference path="SpriteSheetViewer.ts" />
/// <reference path="MapBuilder.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export class OutputHandler {
        constructor(utilities: JQuery, persistenceManager: PersistenceManager, mapBuilder: MapBuilder, spriteSheetViewer: SpriteSheetViewer, tileWidth: number, tileHeight: number) {
            var outputButton: JQuery = utilities.find("#output"),
                outputOptions: JQuery = utilities.find("#outputOptions"),
                outputPanel: JQuery = $("#outputPanel"),
                outputString;

            outputButton.click(() => {
                // Output text
                if (outputOptions.val() === "0") {
                    // We use the same "saving" logic to then generate a string that we push out to the user
                    persistenceManager.SaveMap("_output", "_");
                    outputString = localStorage.getItem("_");
                }
                    // Output Code
                else if (outputOptions.val() === "1") {
                    var resourceMappings = persistenceManager.BuildResourceMaps();

                    // Build the code template
                    outputString =
                    'class MyGame extends eg.Game {}<br /><br />' +
                    'var myGame = new MyGame(),<br />' +
                    '   resourceSheet = new eg.Graphics.Assets.ImageSource("' + spriteSheetViewer.SpriteSheetUrl + '", ' + spriteSheetViewer.ActiveSpriteSheet.Size().Width + ', ' + spriteSheetViewer.ActiveSpriteSheet.Size().Height + '),<br />' +
                    '   resources: eg.Graphics.Assets.ImageSource[] = eg.Map.SquareTileMap.ExtractTiles(resourceSheet, ' + tileWidth + ', ' + tileHeight + '),<br />' +
                    '   layers: eg.Map.SquareTileMap[] = [<br />';

                    for (var i = 0; i < resourceMappings.length; i++) {
                        if (i > 0) {
                            outputString += ', <br />';
                        }

                        outputString += 'new eg.Map.SquareTileMap(0,0,' + tileWidth + ', ' + tileHeight + ', resources, ' + JSON.stringify(resourceMappings[i].Layer) + ')';
                    }

                    outputString += '<br />]; <br /><br />' +
                        'for (var i = 0; i < layers.length; i++) {<br />' +
                        '   myGame.Map.Scenery.AddLayer(layers[i]);<br />' +
                        '}<br />';
                }
                else if (outputOptions.val() === "2") {
                    var parent: HTMLElement = document.createElement("div"),
                        copyCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
                        size: eg.Size2d = mapBuilder.LayerManager.SelectedLayer.Layer.Size(),
                        tempGame: eg.Game,
                        img: string;

                    copyCanvas.width = size.Width;
                    copyCanvas.height = size.Height;

                    parent.style.width = size.Width + "px";
                    parent.style.height = size.Height + "px";

                    parent.appendChild(copyCanvas);

                    tempGame = new eg.Game(copyCanvas);
                    tempGame.Scene.Add(mapBuilder.LayerManager.SelectedLayer.Layer);
                    tempGame.Scene.Camera.Position = mapBuilder.LayerManager.SelectedLayer.Layer.Position;

                    tempGame.Scene.Draw();
                    tempGame.Scene.Draw();

                    img = copyCanvas.toDataURL("image/png");
                    tempGame.Dispose();
                    tempGame = null;                    

                    outputString = '<img src="' + img + '"/>';
                }

                outputPanel.html(outputString);

                outputButton.blur();
                outputOptions.blur();
                window.scrollTo(0, document.body.scrollHeight);

                $("#blockWrapper").height($("#builderPane").height());

                setTimeout(function () {
                    $("#blockWrapper").height($("#builderPane").height());
                }, 500);
            });
        }

    }

}