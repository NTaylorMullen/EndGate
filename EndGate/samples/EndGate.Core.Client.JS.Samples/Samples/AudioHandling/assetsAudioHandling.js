var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Animation = (function () {
    function Animation(imageLocation, x, y, spriteSheetWidth, spriteSheetHeight, frameWidth, frameHeight, fps, frameCount, onComplete, repeat, rotateRandomly) {
        if (typeof repeat === "undefined") { repeat = true; }
        if (typeof rotateRandomly === "undefined") { rotateRandomly = false; }
        this._spriteSheet = new eg.Graphics.Assets.ImageSource(imageLocation, spriteSheetWidth, spriteSheetHeight, 0, 0);
        this._animation = new eg.Graphics.SpriteAnimation(this._spriteSheet, fps, new eg.Size2d(frameWidth, frameHeight), frameCount);
        this._sprite = new eg.Graphics.Sprite2d(x, y, this._spriteSheet, frameWidth, frameHeight);
        this._animation.OnComplete.Bind(onComplete);
        if(rotateRandomly) {
            this._sprite.Rotation = Math.random() * (Math).twoPI + -Math.PI;
        }
        this.Graphic = this._sprite;
        this._animation.Play(repeat);
    }
    Animation.prototype.Update = function (gameTime) {
        this._animation.Update(gameTime);
    };
    return Animation;
})();
var BurningFlame = (function (_super) {
    __extends(BurningFlame, _super);
    function BurningFlame(x, y) {
        _super.call(this, "images/burning_flame.png", x, y, 768, 128, 128, 128, 16, 6, function () {
});
    }
    return BurningFlame;
})(Animation);
var SmokePoof = (function (_super) {
    __extends(SmokePoof, _super);
    function SmokePoof(x, y, onComplete) {
        _super.call(this, "images/smoke_poof.png", x, y, 1280, 128, 128, 128, 20, 10, onComplete, false, true);
    }
    return SmokePoof;
})(Animation);
var SmokePoofManager = (function () {
    function SmokePoofManager(_mouse, _scene, _onClickSound) {
        this._mouse = _mouse;
        this._scene = _scene;
        this._onClickSound = _onClickSound;
        var _this = this;
        this._smokePoofIds = 0;
        var that = this;
        this._smokePoofs = {
        };
        this._mouse.OnClick.Bind(function (event) {
            var smokePoofId = that._smokePoofIds++, smokePoof;
            smokePoof = new SmokePoof(event.Position.X, event.Position.Y, function () {
                delete that._smokePoofs[smokePoofId];
                that._scene.Remove(smokePoof.Graphic);
            });
            _this._onClickSound.Play().Seek(.1);
            that._smokePoofs[smokePoofId] = smokePoof;
            that._scene.Add(smokePoof.Graphic);
        });
    }
    SmokePoofManager.prototype.Update = function (gameTime) {
        for(var id in this._smokePoofs) {
            this._smokePoofs[id].Update(gameTime);
        }
    };
    return SmokePoofManager;
})();
var AudioHandler = (function (_super) {
    __extends(AudioHandler, _super);
    function AudioHandler(canvas) {
        _super.call(this, canvas);
        this._burningFlame = new BurningFlame(canvas.width / 2, canvas.height / 2);
        this.Scene.Add(this._burningFlame.Graphic);
        this.Audio.Load("burning", [
            "sounds/fireburning.ogg", 
            "sounds/fireburning.mp3"
        ]);
        this._smokePoofManager = new SmokePoofManager(this.Input.Mouse, this.Scene, this.Audio.Load("poof", [
            "sounds/smokepoof.ogg", 
            "sounds/smokepoof.mp3"
        ]));
        this._burningSound = this.Audio.Play("burning", new eg.Sound.AudioSettings(true, 75));
    }
    AudioHandler.prototype.Update = function (gameTime) {
        this._burningFlame.Update(gameTime);
        this._smokePoofManager.Update(gameTime);
    };
    return AudioHandler;
})(eg.Game);
//@ sourceMappingURL=assetsAudioHandling.js.map
