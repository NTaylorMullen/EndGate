var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="Knight.ts" />
/// <reference path="Player.ts" />
// Wrap in module to keep code out of global scope
var RawRPG;
(function (RawRPG) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
                _super.call(this, canvas);
            // The playersKnight is the knight that is drawn on the screen
            this._playersKnight = new RawRPG.Knight(new eg.Vector2d(canvas.width / 2, canvas.height / 2));
            // The player is the gate way for the user viewing the web page to control the knight
            this._player = new RawRPG.Player(this.Input.Keyboard, this._playersKnight);
            // Draw the players knight on the screen
            this.Scene.Add(this._playersKnight.Graphic);
        }
        Game.prototype.Update = function (gameTime) {
            // Update the knight so it can move etc.
            this._playersKnight.Update(gameTime);
            // Update the camera to follow our knight.
            this.Scene.Camera.Position = this._playersKnight.MovementController.Position;
        };
        return Game;
    })(eg.Game);
    RawRPG.Game = Game;    
})(RawRPG || (RawRPG = {}));
//@ sourceMappingURL=Game.js.map
