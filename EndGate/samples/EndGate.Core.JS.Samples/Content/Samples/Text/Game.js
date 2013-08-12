var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
var Texts;
(function (Texts) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas) {
            _super.call(this, _canvas);
            this._canvas = _canvas;
            var that = this;

            this.Text = new eg.Graphics.Text2d(this._canvas.width / 2, this._canvas.height / 2, "Hello World!");
            this.Text.FontSettings.FontSize = "20pt";
            this.Text.FontSettings.FontFamily = eg.Graphics.Assets.FontFamily.TimesNewRoman;
            this.Scene.Add(this.Text);
        }
        return Game;
    })(eg.Game);
    Texts.Game = Game;
})(Texts || (Texts = {}));
//@ sourceMappingURL=Game.js.map
