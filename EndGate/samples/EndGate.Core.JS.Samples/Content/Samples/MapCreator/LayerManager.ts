/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />

// Wrap in module to keep code out of global scope
module MapCreator {

    export interface ILayer {
        Name: string;
        Layer: eg.Graphics.Grid;
    }

    export class LayerManager {
        public SelectedLayer: ILayer;
        public Layers: ILayer[];

        private _currentZIndex: number = -1000;

        constructor(private _gameScene: eg.Rendering.Scene2d, private _defaultGrid: eg.Graphics.Grid, private _layersSelect: JQuery, addLayerButton: JQuery, layerName: JQuery, private _onLayerChange: (layer: ILayer) => void ) {
            // Build default layer for map builder
            this.Layers = [{ Name: "Background", Layer: new eg.Graphics.Grid(_defaultGrid.Position.X, _defaultGrid.Position.Y, _defaultGrid.Rows, _defaultGrid.Columns, _defaultGrid.TileSize.Width, _defaultGrid.TileSize.Height) }];
            this.SelectedLayer = this.Layers[0];

            this.SelectedLayer.Layer.ZIndex = this._currentZIndex++;

            _layersSelect.change(() => {
                this.SelectedLayer = this.Layers[parseInt(_layersSelect.val())];
                _onLayerChange(this.SelectedLayer);
            });

            addLayerButton.click(() => {
                this.AddLayer(layerName.val());
                layerName.val("");
                addLayerButton.blur();
            });

            this._gameScene.Add(this.SelectedLayer.Layer);
        }

        public AddLayer(layerName: string): ILayer {
            // Build empty layer based off of the visible grid
            var addedLayer: ILayer = {
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
        }

        public LoadLayersFromResourceMaps(resourceMaps: ILayerMap[], spriteSheet: eg.Graphics.Grid) {
            var resources = <eg.Graphics.Sprite2d[]>spriteSheet.GetSpace(0, 0, spriteSheet.Rows - 1, spriteSheet.Columns - 1),
                grid: eg.Graphics.Grid,
                currentLayer: ILayer,
                originalLayer: eg.Graphics.Grid = this.Layers[0].Layer;

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
        }
    }

}