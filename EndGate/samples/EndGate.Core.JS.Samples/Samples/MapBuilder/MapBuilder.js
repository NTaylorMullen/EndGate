var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MapBuilder = (function (_super) {
    __extends(MapBuilder, _super);
    function MapBuilder(canvas, utilities, _spriteSheetViewer, _rows, _columns, _tileWidth, _tileHeight) {
        var _this = this;
        _super.call(this, canvas);
        this._spriteSheetViewer = _spriteSheetViewer;
        this._rows = _rows;
        this._columns = _columns;
        this._tileWidth = _tileWidth;
        this._tileHeight = _tileHeight;
        var addLayer = $("#addLayer"), layerName = $("#layerName");
        this._layersSelect = $("#layers");
        this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
        this._visibleGrid.ZIndex = 100;
        this._layers = [
            {
                Name: "Background",
                Layer: new eg.Graphics.Grid(this._visibleGrid.Position.X, this._visibleGrid.Position.Y, _rows, _columns, _tileWidth, _tileHeight)
            }
        ];
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        this._cameraZoomController = new CameraZoomController(this.Scene.Camera, this.Input.Mouse);
        this._persistenceManager = new PersistenceManager(utilities, function () {
            return _this._layers;
        }, _spriteSheetViewer.SpriteSheetUrl, function (grid) {
            return _this.BuildResourceMap(grid);
        });
        this._outputHandler = new OutputHandler(utilities, this._persistenceManager, _spriteSheetViewer, _tileWidth, _tileHeight);
        this.Scene.Add(this._visibleGrid);
        this.Scene.Add(this._layers[0].Layer);
        this._tileFiller = new TileFiller(this._layers[0].Layer, _tileWidth, _tileHeight);
        this._tileSelector = new TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse, function (gridEntries) {
            _this._tileFiller.Fill(gridEntries, _this._spriteSheetViewer.SelectedSources);
        }, function (gridEntries) {
            _this._tileFiller.Clear(gridEntries);
        });
        addLayer.click(function () {
            _this.AddLayer(layerName.val());
            layerName.val("");
            addLayer.blur();
        });
        this._layersSelect.change(function () {
            _this._tileFiller.ChangeGrid(_this._layers[parseInt(_this._layersSelect.val())].Layer);
        });
    }
    MapBuilder.prototype.AddLayer = function (layerName) {
        var addedLayer = {
            Name: layerName,
            Layer: new eg.Graphics.Grid(this._visibleGrid.Position.X, this._visibleGrid.Position.Y, this._rows, this._columns, this._tileWidth, this._tileHeight)
        };
        this._layers.push(addedLayer);
        this._layersSelect.append($("<option value='" + (this._layers.length - 1) + "'>" + addedLayer.Name + "</option>"));
        this._layersSelect.val((this._layers.length - 1).toString());
        this._tileFiller.ChangeGrid(addedLayer.Layer);
        this.Scene.Add(addedLayer.Layer);
        return addedLayer;
    };
    MapBuilder.prototype.BuildResourceMap = function (grid) {
        var resources = this._spriteSheetViewer.VisibleGrid.GetSpace(1, 1, this._spriteSheetViewer.VisibleGrid.Rows(), this._spriteSheetViewer.VisibleGrid.Columns()), rows = grid.Rows(), columns = grid.Columns(), tile, resourceMap = [];
        for(var i = 1; i <= rows; i++) {
            resourceMap[i - 1] = [];
            for(var j = 1; j <= columns; j++) {
                tile = grid.Get(i, j);
                if(tile) {
                    resourceMap[i - 1][j - 1] = this.FindResource(tile.Image, resources);
                } else {
                    resourceMap[i - 1][j - 1] = -1;
                }
            }
        }
        return resourceMap;
    };
    MapBuilder.prototype.LoadLayersFromResourceMaps = function (resourceMaps) {
        var resources = this._spriteSheetViewer.VisibleGrid.GetSpace(1, 1, this._spriteSheetViewer.VisibleGrid.Rows(), this._spriteSheetViewer.VisibleGrid.Columns()), grid, currentLayer, originalLayer = this._layers[0].Layer;
        this.Scene.Remove(originalLayer);
        this._layersSelect.html("");
        this._layers = [];
        for(var i = 0; i < resourceMaps.length; i++) {
            currentLayer = this.AddLayer(resourceMaps[i].Name);
            grid = currentLayer.Layer;
            for(var row = 0; row < resourceMaps[i].Layer.length; row++) {
                for(var column = 0; column < resourceMaps[i].Layer[row].length; column++) {
                    if(resourceMaps[i].Layer[row][column] !== -1) {
                        grid.Fill(row + 1, column + 1, new eg.Graphics.Sprite2d(0, 0, resources[resourceMaps[i].Layer[row][column]].Image, this._tileWidth, this._tileHeight));
                    }
                }
            }
            this._tileFiller.ChangeGrid(this._layers[0].Layer);
        }
        this._layersSelect.val('0');
    };
    MapBuilder.prototype.FindResource = function (source, resources) {
        for(var i = 0; i < resources.length; i++) {
            if(resources[i].Image === source) {
                return i;
            }
        }
        return -1;
    };
    return MapBuilder;
})(eg.Game);
//@ sourceMappingURL=MapBuilder.js.map
