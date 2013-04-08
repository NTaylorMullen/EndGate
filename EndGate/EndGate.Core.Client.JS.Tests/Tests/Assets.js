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
        if (this.UpdateCount === this._updateLimit) {
            this._onUpdateLimit();
        }
    };
    return UpdateTester;
})(EndGate.Core.Game);