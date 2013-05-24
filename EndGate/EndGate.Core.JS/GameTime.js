/// <reference path="Interfaces/ITyped.ts" />
var EndGate;
(function (EndGate) {
    var GameTime = (function () {
        function GameTime() {
            this._type = "GameTime";
            this.Now = new Date();
            this._start = this.Now.getTime();
        }
        GameTime.prototype.Update = function () {
            var now = new Date(), nowMs = now.getTime();
            this.Elapsed = nowMs - this.Now.getTime();
            this.ElapsedSecond = this.Elapsed / 1000;
            this.Total = nowMs - this._start;
            this.Now = now;
        };
        return GameTime;
    })();
    EndGate.GameTime = GameTime;    
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=GameTime.js.map
