var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var UpdateTester = (function (_super) {
    __extends(UpdateTester, _super);
    function UpdateTester(updateRate, onUpdateLimit, updateLimit) {
        _super.call(this);
        this.Configuration.UpdateRate(updateRate);
        this.UpdateCount = 0;
        this._onUpdateLimit = onUpdateLimit;
        this._updateLimit = updateLimit;
    }
    UpdateTester.prototype.Update = function (gameTime) {
        this.UpdateCount++;
        if(this.UpdateCount === this._updateLimit) {
            this._onUpdateLimit();
        }
    };
    return UpdateTester;
})(EndGate.Game);
var DrawTester = (function (_super) {
    __extends(DrawTester, _super);
    function DrawTester(onDrawLimit, drawLimit) {
        _super.call(this);
        this.DrawCount = 0;
        this._onDrawLimit = onDrawLimit;
        this._drawLimit = drawLimit;
    }
    DrawTester.prototype.Draw = function (context) {
        this.DrawCount++;
        if(this.DrawCount === this._drawLimit) {
            this._onDrawLimit();
        }
    };
    return DrawTester;
})(EndGate.Game);
var CollisionManagerGame = (function (_super) {
    __extends(CollisionManagerGame, _super);
    function CollisionManagerGame() {
        _super.call(this);
    }
    CollisionManagerGame.prototype.MonitorCollision = function (obj) {
        this.CollisionManager.Monitor(obj);
    };
    CollisionManagerGame.prototype.RegisterCollisionEvent = function (e) {
        this.CollisionManager.OnCollision.Bind(e);
    };
    return CollisionManagerGame;
})(EndGate.Game);
//@ sourceMappingURL=Assets.js.map
