/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var LayerManager = (function () {
        function LayerManager(_gameScene, _defaultGrid, _layersSelect, addLayerButton, layerName, _onLayerChange) {
            var _this = this;
            this._gameScene = _gameScene;
            this._defaultGrid = _defaultGrid;
            this._layersSelect = _layersSelect;
            this._onLayerChange = _onLayerChange;
            this._currentZIndex = -1000;
            // Build default layer for map builder
            this.Layers = [{ Name: "Background", Layer: new eg.Graphics.Grid(_defaultGrid.Position.X, _defaultGrid.Position.Y, _defaultGrid.Rows, _defaultGrid.Columns, _defaultGrid.TileSize.Width, _defaultGrid.TileSize.Height) }];
            this.SelectedLayer = this.Layers[0];

            this.SelectedLayer.Layer.ZIndex = this._currentZIndex++;

            _layersSelect.change(function () {
                _this.SelectedLayer = _this.Layers[parseInt(_layersSelect.val())];
                _onLayerChange(_this.SelectedLayer);
            });

            addLayerButton.click(function () {
                _this.AddLayer(layerName.val());
                layerName.val("");
                addLayerButton.blur();
            });

            this._gameScene.Add(this.SelectedLayer.Layer);
        }
        LayerManager.prototype.AddLayer = function (layerName) {
            // Build empty layer based off of the visible grid
            var addedLayer = {
                Name: layerName,
                Layer: new eg.Graphics.Grid(this._defaultGrid.Position.X, this._defaultGrid.Position.Y, this._defaultGrid.Rows, this._defaultGrid.Columns, this._defaultGrid.TileSize.Width, this._defaultGrid.TileSize.Height)
            };

            addedLayer.Layer.ZIndex = this._currentZIndex++;

            // Add layer to the list of layers that we're maintaining
            this.Layers.push(addedLayer);

            // Add layer to the select
            this._layersSelect.append($("<option value='" + (this.Layers.length - 1) + "'>" + addedLayer.Name + "</option>"));

            // Select the newly added layer
            this._layersSelect.val((this.Layers.length - 1).toString());

            this.SelectedLayer = addedLayer;
            this._onLayerChange(this.SelectedLayer);

            // Add the layer to the scene (start drawing it)
            this._gameScene.Add(addedLayer.Layer);

            return addedLayer;
        };

        LayerManager.prototype.LoadLayersFromResourceMaps = function (resourceMaps, spriteSheet) {
            var resources = spriteSheet.GetSpace(0, 0, spriteSheet.Rows - 1, spriteSheet.Columns - 1), grid, currentLayer, originalLayer = this.Layers[0].Layer;

            this._gameScene.Remove(originalLayer);
            this._layersSelect.html("");
            this.Layers = [];

            for (var i = 0; i < resourceMaps.length; i++) {
                currentLayer = this.AddLayer(resourceMaps[i].Name);
                grid = currentLayer.Layer;

                for (var row = 0; row < resourceMaps[i].Layer.length; row++) {
                    for (var column = 0; column < resourceMaps[i].Layer[row].length; column++) {
                        if (resourceMaps[i].Layer[row][column] !== -1) {
                            grid.Fill(row, column, new eg.Graphics.Sprite2d(0, 0, resources[resourceMaps[i].Layer[row][column]].Image, spriteSheet.TileSize.Width, spriteSheet.TileSize.Height));
                        }
                    }
                }
            }

            this.SelectedLayer = this.Layers[0];
            this._onLayerChange(this.SelectedLayer);

            this._layersSelect.val('0');
        };
        return LayerManager;
    })();
    MapCreator.LayerManager = LayerManager;
})(MapCreator || (MapCreator = {}));
//# sourceMappingURL=LayerManager.js.map
