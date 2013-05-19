var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LayeringGame = (function (_super) {
    __extends(LayeringGame, _super);
    function LayeringGame(canvas) {
        _super.call(this, canvas);
        this._world = new World(this.Scene, new eg.Vector2d(canvas.width / 2, canvas.height / 2));
        this._layerController = new LayerController(this._world);
    }
    return LayeringGame;
})(eg.Game);
//@ sourceMappingURL=LayeringGame.js.map
