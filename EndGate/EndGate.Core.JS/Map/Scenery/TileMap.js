var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Map) {
        var TileMap = (function (_super) {
            __extends(TileMap, _super);
            function TileMap(x, y, resources) {
                        _super.call(this, new EndGate.Vector2d(x, y));
                this._Resources = resources;
            }
            return TileMap;
        })(EndGate.Graphics.Abstractions.Graphic2d);
        Map.TileMap = TileMap;        
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=TileMap.js.map
