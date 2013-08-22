/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var AudioHandling;
(function (AudioHandling) {
    var BurningFlame = (function (_super) {
        __extends(BurningFlame, _super);
        function BurningFlame(x, y) {
            _super.call(this, BurningFlame.BaseGraphic.Clone(), x, y, 128, 128, 16, 6, function () {
            });
        }
        return BurningFlame;
    })(AudioHandling.Animation);
    AudioHandling.BurningFlame = BurningFlame;
})(AudioHandling || (AudioHandling = {}));
//# sourceMappingURL=BurningFlame.js.map
