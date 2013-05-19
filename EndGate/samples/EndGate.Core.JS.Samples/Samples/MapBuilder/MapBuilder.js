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
        this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
        this._visibleGrid.ZIndex = 100;
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        this._cameraZoomController = new CameraZoomController(this.Scene.Camera, this.Input.Mouse);
        this._persistenceManager = new PersistenceManager(utilities, function () {
            return _this.LayerManager.Layers;
        }, _spriteSheetViewer.SpriteSheetUrl, function (grid) {
            return _this.BuildResourceMap(grid);
        });
        this.LayerManager = new LayerManager(this.Scene, this._visibleGrid, $("#layers"), $("#addLayer"), $("#layerName"), function (layer) {
            _this._tileFiller.ChangeGrid(layer.Layer);
        });
        this._outputHandler = new OutputHandler(utilities, this._persistenceManager, _spriteSheetViewer, _tileWidth, _tileHeight);
        this._tileFiller = new TileFiller(this.LayerManager.SelectedLayer.Layer, _tileWidth, _tileHeight);
        this._tileSelector = new TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse, function (gridEntries) {
            _this._tileFiller.Fill(gridEntries, _this._spriteSheetViewer.SelectedSources);
        }, function (gridEntries) {
            _this._tileFiller.Clear(gridEntries);
        });
        this.Scene.Add(this._visibleGrid);
    }
    MapBuilder.prototype.BuildResourceMap = function (grid) {
        var resources = this._spriteSheetViewer.VisibleGrid.GetSpace(0, 0, this._spriteSheetViewer.VisibleGrid.Rows() - 1, this._spriteSheetViewer.VisibleGrid.Columns() - 1), rows = grid.Rows(), columns = grid.Columns(), tile, resourceMap = [];
        for(var i = 0; i < rows; i++) {
            resourceMap[i] = [];
            for(var j = 0; j < columns; j++) {
                tile = grid.Get(i, j);
                if(tile) {
                    resourceMap[i][j] = this.FindResource(tile.Image, resources);
                } else {
                    resourceMap[i][j] = -1;
                }
            }
        }
        return resourceMap;
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
