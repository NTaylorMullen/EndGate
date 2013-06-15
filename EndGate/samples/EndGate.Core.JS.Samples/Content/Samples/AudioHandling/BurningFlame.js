var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />
// Wrap in module to keep code out of global scope
var AudioHandling;
(function (AudioHandling) {
    var BurningFlame = (function (_super) {
        __extends(BurningFlame, _super);
        function BurningFlame(x, y) {
                _super.call(this, "/Content/Samples/AudioHandling/images/burning_flame.png", x, y, 768, 128, 128, 128, 16, 6, function () {
    });
        }
        return BurningFlame;
    })(AudioHandling.Animation);
    AudioHandling.BurningFlame = BurningFlame;    
})(AudioHandling || (AudioHandling = {}));
//@ sourceMappingURL=BurningFlame.js.map
