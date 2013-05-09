var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SpriteSheetViewer = (function (_super) {
    __extends(SpriteSheetViewer, _super);
    function SpriteSheetViewer(canvas, utilities, _tileWidth, _tileHeight) {
        var _this = this;
        _super.call(this, canvas);
        this._tileWidth = _tileWidth;
        this._tileHeight = _tileHeight;
        var getSpriteSheet = utilities.find("#getSpriteSheet"), spriteSheetUrl = utilities.find("#spriteSheetUrl");
        getSpriteSheet.click(function () {
            _this.loadSpritesheet(spriteSheetUrl.val());
            getSpriteSheet.blur();
            spriteSheetUrl.blur();
        });
        this._cameraController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        getSpriteSheet.click();
    }
    SpriteSheetViewer.prototype.loadSpritesheet = function (url) {
        var _this = this;
        this._activeSpriteSheet = new eg.Graphics.Assets.ImageSource(url);
        this._activeSpriteSheet.OnLoaded.Bind(function () {
            if(_this._visibleGrid) {
                _this.Scene.Camera.Position = new eg.Vector2d(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2);
            }
            _this._visibleGrid = new eg.Graphics.Grid(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2, Math.floor(_this._activeSpriteSheet.ClipSize.Height / _this._tileHeight), Math.floor(_this._activeSpriteSheet.ClipSize.Width / _this._tileWidth), _this._tileWidth, _this._tileHeight, true);
            for(var i = 0; i < _this._visibleGrid.Rows(); i++) {
                for(var j = 0; j < _this._visibleGrid.Columns(); j++) {
                    _this._visibleGrid.Fill(i + 1, j + 1, new eg.Graphics.Sprite2d(0, 0, _this._activeSpriteSheet.Extract(j * _this._tileWidth, i * _this._tileHeight, _this._tileWidth, _this._tileHeight)));
                }
            }
            _this.Scene.Add(_this._visibleGrid);
        });
    };
    return SpriteSheetViewer;
})(eg.Game);
//@ sourceMappingURL=SpriteSheetViewer.js.map
