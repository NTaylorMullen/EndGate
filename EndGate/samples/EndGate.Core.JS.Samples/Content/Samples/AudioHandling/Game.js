var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="BurningFlame.ts" />
/// <reference path="SmokePoofManager.ts" />
// Wrap in module to keep code out of global scope
var AudioHandling;
(function (AudioHandling) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            _super.call(this, canvas);

            // Create the burning flame at the center of the canvas
            this._burningFlame = new AudioHandling.BurningFlame(canvas.width / 2, canvas.height / 2);

            // Add the burning flames graphic to the Scene (so it can be drawn)
            this.Scene.Add(this._burningFlame.Graphic);

            // We pass in the loaded AudioPlayer for the smoke poof sound
            this._smokePoofManager = new AudioHandling.SmokePoofManager(this.Input.Mouse, this.Scene, this.Content.GetAudio("poof"));

            // Play our burning sound on repeat at 75% volume.  The this._burningSound allows for modification of the sound after
            // it has begun to play.  However, in this sample we do not do any modifications to the sound once we play it.
            // The reason why we still save the playing sound is to prevent it from being garbage collected.
            this._burningSound = this.Content.GetAudio("burning").Play(new eg.Sound.AudioSettings(true, 75));
        }
        // This method is triggered at the end of the "super" call within the constructor, it's called once per game and should contain all image/audio loading resources.
        Game.prototype.LoadContent = function () {
            // The LoadImage functions return the loaded image, it can also be retrieved via the name by "GetImage"
            AudioHandling.SmokePoof.BaseGraphic = this.Content.LoadImage("smokePoof", "/Content/Samples/AudioHandling/images/smoke_poof.png", 1280, 128);
            AudioHandling.BurningFlame.BaseGraphic = this.Content.LoadImage("burningFlame", "/Content/Samples/AudioHandling/images/burning_flame.png", 768, 128);

            // Load our audio files
            // We provide two sound files so that it can play properly in all browsers. If one sound file fails to load/play the other will be loaded and played.
            this.Content.LoadAudio("burning", ["/Content/Samples/AudioHandling/sounds/fireburning.ogg", "/Content/Samples/AudioHandling/sounds/fireburning.mp3"]);
            this.Content.LoadAudio("poof", ["/Content/Samples/AudioHandling/sounds/smokepoof.ogg", "/Content/Samples/AudioHandling/sounds/smokepoof.mp3"]);
        };

        Game.prototype.Update = function (gameTime) {
            this._burningFlame.Update(gameTime);
            this._smokePoofManager.Update(gameTime);
        };
        return Game;
    })(eg.Game);
    AudioHandling.Game = Game;
})(AudioHandling || (AudioHandling = {}));
//@ sourceMappingURL=Game.js.map
