/// <reference path="../../Graphics/ImageSource.ts" />
/// <reference path="../../Graphics/Sprites/Sprite2d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        (function (Assets) {
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
                    _super.call(this, 0, 0, image, width, height); // Set position to 0 because the tile gets updated when it gets added to the tile map
                }
                return SquareTile;
            })(EndGate.Graphics.Sprite2d);
            Assets.SquareTile = SquareTile;
        })(Graphics.Assets || (Graphics.Assets = {}));
        var Assets = Graphics.Assets;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
