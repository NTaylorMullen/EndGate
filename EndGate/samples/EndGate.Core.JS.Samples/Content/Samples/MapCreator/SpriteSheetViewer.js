/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="CameraDragController.ts" />
/// <reference path="CameraZoomController.ts" />
/// <reference path="TileSelector.ts" />
/// <reference path="TileHighlighter.ts" />
/// <reference path="GridEntry.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var MapCreator;
(function (MapCreator) {
    var SpriteSheetViewer = (function (_super) {
        __extends(SpriteSheetViewer, _super);
        function SpriteSheetViewer(canvas, SpriteSheetUrl, _tileWidth, _tileHeight, _readyCallback) {
            _super.call(this, canvas);
            this.SpriteSheetUrl = SpriteSheetUrl;
            this._tileWidth = _tileWidth;
            this._tileHeight = _tileHeight;
            this._readyCallback = _readyCallback;

            this.SelectedSources = [];
            this._cameraDragController = new MapCreator.CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
            this._cameraZoomController = new MapCreator.CameraZoomController(this.Scene.Camera, this.Input.Mouse);
            this.loadSpritesheet(SpriteSheetUrl);
        }
        SpriteSheetViewer.prototype.loadSpritesheet = function (url) {
            var _this = this;
            this.ActiveSpriteSheet = new eg.Graphics.ImageSource(url);

            this.ActiveSpriteSheet.OnLoaded.Bind(function () {
                var createTileSelector = false;

                if (_this.VisibleGrid) {
                    _this.Scene.Camera.Position = new eg.Vector2d(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2);
                } else {
                    createTileSelector = true;
                }

                _this.VisibleGrid = new eg.Graphics.Grid(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2, Math.floor(_this.ActiveSpriteSheet.ClipSize.Height / _this._tileHeight), Math.floor(_this.ActiveSpriteSheet.ClipSize.Width / _this._tileWidth), _this._tileWidth, _this._tileHeight, true);

                for (var i = 0; i < _this.VisibleGrid.Rows; i++) {
                    for (var j = 0; j < _this.VisibleGrid.Columns; j++) {
                        _this.VisibleGrid.Fill(i, j, new eg.Graphics.Sprite2d(0, 0, _this.ActiveSpriteSheet.Extract(j * _this._tileWidth, i * _this._tileHeight, _this._tileWidth, _this._tileHeight)));
                    }
                }

                if (createTileSelector) {
                    _this._tileHighlighter = new MapCreator.TileHighlighter(_this.VisibleGrid);
                    _this._tileSelector = new MapCreator.TileSelector(_this.VisibleGrid, _this.Scene, _this.Scene.Camera, _this._cameraDragController, _this.Input.Mouse, function (tiles) {
                        var tile;

                        _this.SelectedSources = [];

                        for (var i = 0; i < tiles.length; i++) {
                            tile = _this.VisibleGrid.Get(tiles[i].Row, tiles[i].Column);

                            if (tile) {
                                _this.SelectedSources.push(tile.Image);
                            }
                        }

                        _this._tileHighlighter.HighlightTiles(tiles);
                    }, function (tiles) {
                        var index, tile;

                        for (var i = 0; i < tiles.length; i++) {
                            tile = _this.VisibleGrid.Get(tiles[i].Row, tiles[i].Column);

                            if (tile) {
                                index = _this.SelectedSources.indexOf(tile.Image);
                                if (index >= 0) {
                                    _this.SelectedSources.splice(index, 1);
                                }
                            }
                        }

                        _this._tileHighlighter.UnHighlightTiles(tiles);
                    });
                }

                _this.Scene.Add(_this.VisibleGrid);

                if (_this._readyCallback) {
                    _this._readyCallback();
                }
            });
        };
        return SpriteSheetViewer;
    })(eg.Game);
    MapCreator.SpriteSheetViewer = SpriteSheetViewer;
})(MapCreator || (MapCreator = {}));
//# sourceMappingURL=SpriteSheetViewer.js.map
