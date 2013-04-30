var KnightAnimationHandler = (function () {
    function KnightAnimationHandler(knight) {
        var _this = this;
        this._knight = knight;
        this._animations = {
        };
        for(var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
            this._animations[KnightAnimationHandler._animationDirectionMap[i]] = new eg.Graphics.SpriteAnimation(knight.Graphic.Image, 18, new eg.Size2d(64, 64), 9, new eg.Vector2d(0, i * 64));
        }
        this._knight.MovementController.OnMove.Bind(function (moveEvent) {
            _this.KnightMove(moveEvent);
        });
    }
    KnightAnimationHandler._animationDirectionMap = [
        "Up", 
        "Left", 
        "Down", 
        "Right"
    ];
    KnightAnimationHandler.prototype.KnightMove = function (moveEvent) {
        if(moveEvent.StartMoving) {
            this._animations[moveEvent.Direction].Play(true);
        } else {
            this._animations[moveEvent.Direction].Stop();
        }
    };
    KnightAnimationHandler.prototype.Update = function (gameTime) {
        for(var i = 0; i < KnightAnimationHandler._animationDirectionMap.length; i++) {
            this._animations[KnightAnimationHandler._animationDirectionMap[i]].Update(gameTime);
        }
    };
    return KnightAnimationHandler;
})();
//@ sourceMappingURL=KnightAnimationHandler.js.map
