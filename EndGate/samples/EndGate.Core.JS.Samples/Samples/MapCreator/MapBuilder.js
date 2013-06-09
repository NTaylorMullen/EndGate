var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="CameraZoomController.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileFiller.ts" />
/// <reference path="GridEntry.ts" />
/// <reference path="SpriteSheetViewer.ts" />
/// <reference path="PersistenceManager.ts" />
/// <reference path="OutputHandler.ts" />
/// <reference path="LayerManager.ts" />
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
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
            // Create a grid that draws grid lines
            this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
            // Set ZIndex to be high so that it overlays any map that is created
            this._visibleGrid.ZIndex = 100;
            // Build map builder objects
            this._cameraDragController = new MapCreator.CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
            this._cameraZoomController = new MapCreator.CameraZoomController(this.Scene.Camera, this.Input.Mouse);
            this._persistenceManager = new MapCreator.PersistenceManager(utilities, function () {
                return _this.LayerManager.Layers;
            }, _spriteSheetViewer.SpriteSheetUrl, function (grid) {
                return _this.BuildResourceMap(grid);
            });
            this.LayerManager = new MapCreator.LayerManager(this.Scene, this._visibleGrid, $("#layers"), $("#addLayer"), $("#layerName"), function (layer) {
                _this._tileFiller.ChangeGrid(layer.Layer);
            });
            this._outputHandler = new MapCreator.OutputHandler(utilities, this._persistenceManager, this, _spriteSheetViewer, _tileWidth, _tileHeight);
            this._tileFiller = new MapCreator.TileFiller(this.LayerManager.SelectedLayer.Layer, _tileWidth, _tileHeight);
            this._tileSelector = new MapCreator.TileSelector(this._visibleGrid, this.Scene, this.Scene.Camera, this._cameraDragController, this.Input.Mouse, function (gridEntries) {
                _this._tileFiller.Fill(gridEntries, _this._spriteSheetViewer.SelectedSources);
            }, function (gridEntries) {
                _this._tileFiller.Clear(gridEntries);
            });
            // Draw the visible grid and the default layer
            this.Scene.Add(this._visibleGrid);
            // Bind the "g" key to the "DrawGridLines" functionality of the visible grid
            this.Input.Keyboard.OnCommandDown("g", function () {
                _this._visibleGrid.DrawGridLines = !_this._visibleGrid.DrawGridLines;
            });
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
    MapCreator.MapBuilder = MapBuilder;    
})(MapCreator || (MapCreator = {}));
//@ sourceMappingURL=MapBuilder.js.map
