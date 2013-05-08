var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SpriteSheetViewer = (function (_super) {
    __extends(SpriteSheetViewer, _super);
    function SpriteSheetViewer(canvas, utilities) {
        var _this = this;
        _super.call(this, canvas);
        var getSpriteSheet = utilities.find("#getSpriteSheet"), spriteSheetUrl = utilities.find("#spriteSheetUrl");
        getSpriteSheet.click(function () {
            var promptVal = prompt("Tile Width");
            if(promptVal !== null) {
                _this._tileWidth = parseFloat(promptVal);
            }
            promptVal = prompt("Tile Height");
            if(promptVal !== null) {
                _this._tileHeight = parseFloat(promptVal);
            }
            _this.loadSpritesheet(spriteSheetUrl.val());
            getSpriteSheet.blur();
            spriteSheetUrl.blur();
        });
        this._cameraController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
    }
    SpriteSheetViewer.prototype.loadSpritesheet = function (url) {
        var _this = this;
        this._activeSpriteSheet = new eg.Graphics.Assets.ImageSource(url);
        this._activeSpriteSheet.OnLoaded.Bind(function () {
            if(_this._visibleSprite) {
                _this.Scene.Camera.Position = new eg.Vector2d(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2);
                _this.Scene.Remove(_this._visibleSprite);
            }
            _this._visibleSprite = new eg.Graphics.Sprite2d(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2, _this._activeSpriteSheet);
            _this._visibleGrid = new eg.Graphics.Grid(_this.Scene.DrawArea.width / 2, _this.Scene.DrawArea.height / 2, Math.floor(_this._activeSpriteSheet.ClipSize.Height / _this._tileHeight), Math.floor(_this._activeSpriteSheet.ClipSize.Width / _this._tileWidth), _this._tileWidth, _this._tileHeight, true);
            _this.Scene.Add(_this._visibleSprite);
            _this.Scene.Add(_this._visibleGrid);
        });
    };
    return SpriteSheetViewer;
})(eg.Game);
//@ sourceMappingURL=SpriteSheetViewer.js.map
