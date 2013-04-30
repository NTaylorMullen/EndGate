var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var RPG = (function (_super) {
    __extends(RPG, _super);
    function RPG(canvas) {
        _super.call(this, canvas);
        this._playersKnight = new Knight(new eg.Vector2d(canvas.width / 2, canvas.height / 2));
        this._player = new Player(this.Input.Keyboard, this._playersKnight);
        this.Scene.Add(this._playersKnight.Graphic);
    }
    RPG.prototype.Update = function (gameTime) {
        this._playersKnight.MovementController.Update(gameTime);
        this.Scene.Camera.Position = this._playersKnight.MovementController.Position;
    };
    return RPG;
})(eg.Game);
//@ sourceMappingURL=RPG.js.map
