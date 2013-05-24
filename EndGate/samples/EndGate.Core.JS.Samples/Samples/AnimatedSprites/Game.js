var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../Scripts/endgate.d.ts" />
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
        Game.prototype.Update = function (gameTime) {
            this._fireExplosionManager.Update(gameTime);
            this._electricPulseManager.Update(gameTime);
        };
        return Game;
    })(eg.Game);
    AnimatedSprites.Game = Game;    
})(AnimatedSprites || (AnimatedSprites = {}));
//@ sourceMappingURL=Game.js.map
