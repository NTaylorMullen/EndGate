/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="UI.ts" />
/// <reference path="TweenManager.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var Tweening;
(function (Tweening) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            var _this = this;
            _super.call(this, canvas);

            this._ui = new Tweening.UI();

            // This rectangle will be the object that is tweened.
            this._object = new eg.Graphics.Rectangle(Game._sideOffset, canvas.height / 2, 100, 70, "blue");

            // Build a Tween manager. Pass in the target object to apply all tweens to and pass in an
            // onTweenComplete function.  After a tween completes we need to re-enable the UI.
            this._tweenManager = new Tweening.TweenManager(this._object, function () {
                // Enable the Play button.
                _this._ui.Enable();
            });

            this._ui.OnPlay.Bind(function (tweenType, duration, tweenFunction) {
                // Disable the Play button.
                _this._ui.Disable();

                // Pass the Play onto the tween manager so it can trigger the current animation.
                _this._tweenManager.Play(tweenType, duration, tweenFunction);
            });

            // Draw the object that will be tweened.
            this.Scene.Add(this._object);
        }
        Game.prototype.Update = function (gameTime) {
            this._tweenManager.Update(gameTime);
        };
        Game._sideOffset = 150;
        return Game;
    })(eg.Game);
    Tweening.Game = Game;
})(Tweening || (Tweening = {}));
//# sourceMappingURL=Game.js.map
