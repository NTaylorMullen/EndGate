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
        this._movementList = [];
        this._currentAnimation = this._animations["Up"];
        this._currentAnimation.Stop();
    }
    KnightAnimationHandler._animationDirectionMap = [
        "Up", 
        "Left", 
        "Down", 
        "Right"
    ];
    KnightAnimationHandler.prototype.KnightMove = function (moveEvent) {
        var velocitySign = this._knight.MovementController.Velocity.Sign(), activeAnimation;
        if(moveEvent.StartMoving === false && this._animations[moveEvent.Direction] === this._currentAnimation) {
            this._currentAnimation.Stop();
        }
        if(velocitySign.X === -1) {
            activeAnimation = this._animations["Left"];
        } else if(velocitySign.X === 1) {
            activeAnimation = this._animations["Right"];
        }
        if(velocitySign.Y === -1) {
            activeAnimation = this._animations["Up"];
        } else if(velocitySign.Y === 1) {
            activeAnimation = this._animations["Down"];
        }
        if(activeAnimation) {
            this._currentAnimation.Stop();
            this._currentAnimation = activeAnimation;
            this._currentAnimation.Play(true);
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
