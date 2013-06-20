var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Graphics/Graphic2d.ts" />
    /// <reference path="../../Graphics/Sprites/ImageSource.ts" />
    (function (Map) {
        /**
        * Defines an abstract class TileMap that takes an array of resources to be mapped to tiles.
        */
        var TileMap = (function (_super) {
            __extends(TileMap, _super);
            /**
            * Creates a new instance of the TileMap object.
            * @param x Initial horizontal location of the tile map.
            * @param y Initial vertical location of the tile map.
            * @param resources A one dimensional array of image resources that make up the tile map (this cannot change after construction).
            */
            function TileMap(x, y, resources) {
                _super.call(this, new eg.Vector2d(x, y));

                this._Resources = resources;
            }
            return TileMap;
        })(eg.Graphics.Abstractions.Graphic2d);
        Map.TileMap = TileMap;
    })(eg.Map || (eg.Map = {}));
    var Map = eg.Map;
})(eg || (eg = {}));
