var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="FireExplosion.ts" />
/// <reference path="ElectricPulse.ts" />
/// <reference path="FireExplosionManager.ts" />
/// <reference path="ElectricPulseManager.ts" />
// Wrap in module to keep code out of global scope
var AnimatedSprites;
(function (AnimatedSprites) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            _super.call(this, canvas);

            this._fireExplosionManager = new AnimatedSprites.FireExplosionManager(this.Input.Mouse, this.Scene);
            this._electricPulseManager = new AnimatedSprites.ElectricPulseManager(this.Input.Mouse, this.Scene);
        }
        // This method is triggered at the end of the "super" call within the constructor, it's called once per game and should contain all image/audio loading resources.
        Game.prototype.LoadContent = function () {
            // The LoadImage functions return the loaded image.
            AnimatedSprites.FireExplosion.BaseGraphic = this.Content.LoadImage("firePulse", "/Content/Samples/AnimatedSprites/images/fire_explosion.png", 1152, 128);
            AnimatedSprites.ElectricPulse.BaseGraphic = this.Content.LoadImage("electricPulse", "/Content/Samples/AnimatedSprites/images/electric_pulse.png", 1152, 128);
        };

        Game.prototype.Update = function (gameTime) {
            this._fireExplosionManager.Update(gameTime);
            this._electricPulseManager.Update(gameTime);
        };
        return Game;
    })(eg.Game);
    AnimatedSprites.Game = Game;
})(AnimatedSprites || (AnimatedSprites = {}));
//@ sourceMappingURL=Game.js.map
