/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
// Wrap in module to keep code out of global scope
var AnimatedSprites;
(function (AnimatedSprites) {
    var ElectricPulse = (function (_super) {
        __extends(ElectricPulse, _super);
        function ElectricPulse(x, y, onComplete) {
            _super.call(this, ElectricPulse.BaseGraphic.Clone(), x, y, 128, 128, 20, 10, onComplete);
        }
        return ElectricPulse;
    })(AnimatedSprites.Animation);
    AnimatedSprites.ElectricPulse = ElectricPulse;
})(AnimatedSprites || (AnimatedSprites = {}));
//# sourceMappingURL=ElectricPulse.js.map
