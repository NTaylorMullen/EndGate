var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
//@ sourceMappingURL=AudioHandling.js.map
