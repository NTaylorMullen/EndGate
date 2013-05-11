var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MapBuilder = (function (_super) {
    __extends(MapBuilder, _super);
    function MapBuilder(canvas, utilities, _rows, _columns, _tileWidth, _tileHeight) {
        _super.call(this, canvas);
        this._rows = _rows;
        this._columns = _columns;
        this._tileWidth = _tileWidth;
        this._tileHeight = _tileHeight;
        this._visibleGrid = new eg.Graphics.Grid(canvas.width / 2, canvas.height / 2, _rows, _columns, _tileWidth, _tileHeight, true);
        this._cameraDragController = new CameraDragController(canvas, this.Scene.Camera, this.Input.Keyboard, this.Input.Mouse);
        this.Scene.Add(this._visibleGrid);
    }
    return MapBuilder;
})(eg.Game);
//@ sourceMappingURL=MapBuilder.js.map
