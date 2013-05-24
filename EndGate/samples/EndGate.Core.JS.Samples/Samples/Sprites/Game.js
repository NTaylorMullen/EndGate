var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../Scripts/jquery.d.ts" />
/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="SpriteAnimator.ts" />
// Wrap in module to keep code out of global scope
var Sprites;
(function (Sprites) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(_canvas, targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, _syncSliders) {
                _super.call(this, _canvas);
            this._canvas = _canvas;
            this._syncSliders = _syncSliders;
            this.Sprite = new eg.Graphics.Sprite2d(this._canvas.width / 2, this._canvas.height / 2, new eg.Graphics.Assets.ImageSource("html5-logo.png", 200, 200));
            this._spriteAnimator = new Sprites.SpriteAnimator(targetAnimators, defaultPosition, defaultSize, defaultRotation, defaultOpacity, this._syncSliders);
            this.Scene.Add(this.Sprite);
        }
        Game.prototype.Update = function (gameTime) {
            this._spriteAnimator.ApplyAnimation(this.Sprite, gameTime);
        };
        return Game;
    })(eg.Game);
    Sprites.Game = Game;    
})(Sprites || (Sprites = {}));
//@ sourceMappingURL=Game.js.map
