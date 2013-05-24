var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../Scripts/endgate.d.ts" />
/// <reference path="Animation.ts" />
// Wrap in module to keep code out of global scope
var AnimatedSprites;
(function (AnimatedSprites) {
    var FireExplosion = (function (_super) {
        __extends(FireExplosion, _super);
        function FireExplosion(x, y, onComplete) {
                _super.call(this, "images/fire_explosion.png", x, y, 1152, 128, 128, 128, 18, 9, onComplete);
        }
        return FireExplosion;
    })(AnimatedSprites.Animation);
    AnimatedSprites.FireExplosion = FireExplosion;    
})(AnimatedSprites || (AnimatedSprites = {}));
//@ sourceMappingURL=FireExplosion.js.map
