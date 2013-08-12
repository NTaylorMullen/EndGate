var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope
var Sprites;
(function (Sprites) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas) {
            _super.call(this, _canvas);
            this._canvas = _canvas;

            this.Sprite = new eg.Graphics.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new eg.Graphics.ImageSource("/Content/Samples/Sprites/html5-logo.png", 200, 200));

            this.Scene.Add(this.Sprite);
        }
        return Game;
    })(eg.Game);
    Sprites.Game = Game;
})(Sprites || (Sprites = {}));
//@ sourceMappingURL=Game.js.map
