var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="World.ts" />
/// <reference path="LayerController.ts" />
// Wrap in module to keep code out of global scope
var Layering;
(function (Layering) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
                _super.call(this, canvas);
            this._world = new Layering.World(this.Scene, new eg.Vector2d(canvas.width / 2, canvas.height / 2));
            this._layerController = new Layering.LayerController(this._world);
        }
        return Game;
    })(eg.Game);
    Layering.Game = Game;    
})(Layering || (Layering = {}));
//@ sourceMappingURL=Game.js.map
