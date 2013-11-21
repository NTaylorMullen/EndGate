/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="PersistenceManager.ts" />
/// <reference path="SpriteSheetViewer.ts" />
/// <reference path="MapBuilder.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var OutputHandler = (function () {
        function OutputHandler(utilities, persistenceManager, mapBuilder, spriteSheetViewer, tileWidth, tileHeight) {
            var outputButton = utilities.find("#output"), outputOptions = utilities.find("#outputOptions"), outputPanel = $("#outputPanel"), outputString;

            outputButton.click(function () {
                // Output text
                if (outputOptions.val() === "0") {
                    // We use the same "saving" logic to then generate a string that we push out to the user
                    persistenceManager.SaveMap("_output", "_");
                    outputString = localStorage.getItem("_");
                } else if (outputOptions.val() === "1") {
                    var resourceMappings = persistenceManager.BuildResourceMaps();

                    // Build the code template
                    outputString = 'class MyGame extends eg.Game {}<br /><br />' + 'var myGame = new MyGame(),<br />' + '   resourceSheet = new eg.Graphics.ImageSource("' + spriteSheetViewer.SpriteSheetUrl + '", ' + spriteSheetViewer.ActiveSpriteSheet.Size.Width + ', ' + spriteSheetViewer.ActiveSpriteSheet.Size.Height + '),<br />' + '   resources: eg.Graphics.ImageSource[] = eg.Graphics.SquareTileMap.ExtractTiles(resourceSheet, ' + tileWidth + ', ' + tileHeight + '),<br />' + '   layers: eg.Graphics.SquareTileMap[] = [<br />';

                    for (var i = 0; i < resourceMappings.length; i++) {
                        if (i > 0) {
                            outputString += ', <br />';
                        }

                        outputString += 'new eg.Graphics.SquareTileMap(0,0,' + tileWidth + ', ' + tileHeight + ', resources, ' + JSON.stringify(resourceMappings[i].Layer) + ')';
                    }

                    outputString += '<br />]; <br /><br />' + 'for (var i = 0; i < layers.length; i++) {<br />' + '   myGame.Scene.Add(layers[i]);<br />' + '}<br />';
                } else if (outputOptions.val() === "2") {
                    var parent = document.createElement("div"), copyCanvas = document.createElement("canvas"), size = mapBuilder.LayerManager.SelectedLayer.Layer.Size, tempGame, img;

                    copyCanvas.width = size.Width;
                    copyCanvas.height = size.Height;

                    parent.style.width = size.Width + "px";
                    parent.style.height = size.Height + "px";

                    parent.appendChild(copyCanvas);

                    tempGame = new eg.Game(copyCanvas);
                    for (var i = 0; i < mapBuilder.LayerManager.Layers.length; i++) {
                        tempGame.Scene.Add(mapBuilder.LayerManager.Layers[i].Layer);
                    }
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
        return OutputHandler;
    })();
    MapCreator.OutputHandler = OutputHandler;
})(MapCreator || (MapCreator = {}));
//# sourceMappingURL=OutputHandler.js.map
