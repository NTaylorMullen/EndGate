var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Graphics/Sprites/ImageSource.ts" />
    /// <reference path="../../Graphics/Sprites/Sprite2d.ts" />
    (function (Map) {
        /**
        * Defines a SquareTile that is used by the SquareTileMap.  Represents one tile within the tile map.
        */
        var SquareTile = (function (_super) {
            __extends(SquareTile, _super);
            /**
            * Creates a new instance of the SquareTile object.
            * @param image The image that is within the tile.
            * @param width The width of the tile.
            * @param height The height of the tile.
            */
            function SquareTile(image, width, height) {
                _super.call(this, 0, 0, image, width, height);
            }
            return SquareTile;
        })(EndGate.Graphics.Sprite2d);
        Map.SquareTile = SquareTile;
    })(EndGate.Map || (EndGate.Map = {}));
    var Map = EndGate.Map;
})(EndGate || (EndGate = {}));
