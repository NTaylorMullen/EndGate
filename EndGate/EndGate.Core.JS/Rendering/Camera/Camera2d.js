var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingRectangle.ts" />
    (function (Rendering) {
        var Camera2d = (function (_super) {
            __extends(Camera2d, _super);
            function Camera2d(position, size) {
                        _super.call(this, position, size);
                this._type = "Camera2d";
                this.Distance = Camera2d.DefaultDistance;
            }
            Camera2d.DefaultDistance = 1000;
            Camera2d.prototype.GetDistanceScale = function () {
                return this.Distance / Camera2d.DefaultDistance;
            };
            Camera2d.prototype.ToCameraRelative = function (position) {
                var scaledTopLeft = this.Position.Subtract(this.Size.Multiply(this.GetDistanceScale() * .5));
                return scaledTopLeft.Add(position.Multiply(this.GetDistanceScale()));
            };
            Camera2d.prototype.GetInverseDistanceScale = function () {
                return Camera2d.DefaultDistance / this.Distance;
            };
            return Camera2d;
        })(EndGate.Bounds.BoundingRectangle);
        Rendering.Camera2d = Camera2d;        
    })(EndGate.Rendering || (EndGate.Rendering = {}));
    var Rendering = EndGate.Rendering;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Camera2d.js.map
