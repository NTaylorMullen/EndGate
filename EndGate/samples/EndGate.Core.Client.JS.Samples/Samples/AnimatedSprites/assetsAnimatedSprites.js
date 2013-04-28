var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animation = (function () {
    function Animation(imageLocation, x, y, spriteSheetWidth, spriteSheetHeight, frameWidth, frameHeight, fps, frameCount, onComplete) {
        this._spriteSheet = new EndGate.Core.Graphics.Sprites.ImageSource(imageLocation, spriteSheetWidth, spriteSheetHeight, 0, 0);
        this._animation = new EndGate.Core.Graphics.Sprites.Animation.SpriteAnimation(this._spriteSheet, fps, new EndGate.Core.Assets.Size2d(frameWidth, frameHeight), frameCount);
        this._sprite = new EndGate.Core.Graphics.Sprites.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);
        this._animation.OnComplete.Bind(onComplete);
        this._sprite.Rotation = Math.random() * (Math).twoPI + -Math.PI;
        this.Graphic = this._sprite;
        this._animation.Play();
    }
    Animation.prototype.Update = function (gameTime) {
        this._animation.Update(gameTime);
    };
    return Animation;
})();
var FireExplosion = (function (_super) {
    __extends(FireExplosion, _super);
    function FireExplosion(x, y, onComplete) {
        _super.call(this, "images/fire_explosion.png", x, y, 1152, 128, 128, 128, 18, 9, onComplete);
    }
    return FireExplosion;
})(Animation);
var ElectricPulse = (function (_super) {
    __extends(ElectricPulse, _super);
    function ElectricPulse(x, y, onComplete) {
        _super.call(this, "images/electric_pulse.png", x, y, 1152, 128, 128, 128, 18, 9, onComplete);
    }
    return ElectricPulse;
})(Animation);
var FireExplosionManager = (function () {
    function FireExplosionManager(_mouse, _scene) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._explosionIds = 0;
        var that = this;
        this._explosions = {
        };
        this._mouse.OnClick.Bind(function (event) {
            var explosionId = that._explosionIds++, explosion;
            explosion = new FireExplosion(event.Position.X, event.Position.Y, function () {
                delete that._explosions[explosionId];
                that._scene.Remove(explosion.Graphic);
            });
            that._explosions[explosionId] = explosion;
            that._scene.Add(explosion.Graphic);
        });
    }
    FireExplosionManager.prototype.Update = function (gameTime) {
        for(var id in this._explosions) {
            this._explosions[id].Update(gameTime);
        }
    };
    return FireExplosionManager;
})();
var ElectricPulseManager = (function () {
    function ElectricPulseManager(_mouse, _scene) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._electricPulseIds = 0;
        this._pulseFrequency = 100;
        this._lastPulse = 0;
        var that = this;
        this._electricPulses = {
        };
        this._mouse.OnMove.Bind(function (event) {
            var electricPulseId, electricPulse, now = new Date().getTime();
            if(now - that._lastPulse >= that._pulseFrequency) {
                that._lastPulse = now;
                electricPulseId = that._electricPulseIds++;
                electricPulse = new ElectricPulse(event.Position.X, event.Position.Y, function () {
                    delete that._electricPulses[electricPulseId];
                    that._scene.Remove(electricPulse.Graphic);
                });
                that._electricPulses[electricPulseId] = electricPulse;
                that._scene.Add(electricPulse.Graphic);
            }
        });
    }
    ElectricPulseManager.prototype.Update = function (gameTime) {
        for(var id in this._electricPulses) {
            this._electricPulses[id].Update(gameTime);
        }
    };
    return ElectricPulseManager;
})();
var Animator = (function (_super) {
    __extends(Animator, _super);
    function Animator(canvas) {
        _super.call(this, canvas);
        this._fireExplosionManager = new FireExplosionManager(this.Input.Mouse, this.Scene);
        this._electricPulseManager = new ElectricPulseManager(this.Input.Mouse, this.Scene);
    }
    Animator.prototype.Update = function (gameTime) {
        this._fireExplosionManager.Update(gameTime);
        this._electricPulseManager.Update(gameTime);
    };
    return Animator;
})(EndGate.Core.Game);
//@ sourceMappingURL=assetsAnimatedSprites.js.map
