var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Map) {
        var Tile = (function (_super) {
            __extends(Tile, _super);
            function Tile(image, width, height) {
                        _super.call(this, 0, 0, image, width, height);
            }
            return Tile;
        })(EndGate.Graphics.Sprite2d);
        Map.Tile = Tile;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Tile.js.map
