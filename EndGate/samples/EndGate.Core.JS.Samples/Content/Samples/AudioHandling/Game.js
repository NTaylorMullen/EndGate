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
            // We provide two sound files so that it can play properly in all browsers. If one sound file fails to load/play
            // the other will be loaded and played.
            this._smokePoofManager = new AudioHandling.SmokePoofManager(this.Input.Mouse, this.Scene, this.Audio.Load("poof", ["/Content/Samples/AudioHandling/sounds/smokepoof.ogg", "/Content/Samples/AudioHandling/sounds/smokepoof.mp3"]));

            // Load our burning flame sound under the key "burning"
            // We provide two sound files for the same reason as detailed above
            this.Audio.Load("burning", ["/Content/Samples/AudioHandling/sounds/fireburning.ogg", "/Content/Samples/AudioHandling/sounds/fireburning.mp3"]);

            // Play our burning sound on repeat at 75% volume.  The this._burningSound allows for modification of the sound after
            // it has begun to play.  However, in this sample we do not do any modifications to the sound once we play it.
            // The reason why we still save the playing sound is to prevent it from being garbage collected.
            this._burningSound = this.Audio.Play("burning", new eg.Sound.AudioSettings(true, 75));
        }
        Game.prototype.Update = function (gameTime) {
            this._burningFlame.Update(gameTime);
            this._smokePoofManager.Update(gameTime);
        };
        return Game;
    })(eg.Game);
    AudioHandling.Game = Game;
})(AudioHandling || (AudioHandling = {}));
//@ sourceMappingURL=Game.js.map
