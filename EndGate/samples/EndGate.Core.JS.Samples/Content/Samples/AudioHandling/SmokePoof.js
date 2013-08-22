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
    var SmokePoof = (function (_super) {
        __extends(SmokePoof, _super);
        function SmokePoof(x, y, onComplete) {
            _super.call(this, SmokePoof.BaseGraphic.Clone(), x, y, 128, 128, 20, 10, onComplete, false, true);
        }
        return SmokePoof;
    })(AudioHandling.Animation);
    AudioHandling.SmokePoof = SmokePoof;
})(AudioHandling || (AudioHandling = {}));
//# sourceMappingURL=SmokePoof.js.map
