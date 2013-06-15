var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/jquery.d.ts" />
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="TextAnimator.ts" />
// Wrap in module to keep code out of global scope, misspelling of Texts is purposeful to avoid namespace conflict
var Texts;
(function (Texts) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas, targetAnimators, defaultPosition, defaultRotation, defaultOpacity, _syncSliders) {
                _super.call(this, _canvas);
            this._canvas = _canvas;
            this._syncSliders = _syncSliders;
            var that = this;
            this.Text = new eg.Graphics.Text2d(defaultPosition.X, defaultPosition.Y, "Hello World!");
            this.Text.FontSettings().FontSize(20);
            this.Text.FontSettings().FontFamily(eg.Graphics.Assets.FontFamily.TimesNewRoman);
            this.Scene.Add(this.Text);
            this._textAnimator = new Texts.TextAnimator(targetAnimators, defaultPosition, defaultRotation, defaultOpacity, this._syncSliders);
        }
        Game.prototype.Update = function (gameTime) {
            this._textAnimator.ApplyAnimation(this.Text, gameTime);
        };
        return Game;
    })(eg.Game);
    Texts.Game = Game;    
})(Texts || (Texts = {}));
//@ sourceMappingURL=Game.js.map
