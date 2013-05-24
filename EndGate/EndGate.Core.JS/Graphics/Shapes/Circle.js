var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Sizes/Size2d.ts" />
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../../Bounds/BoundingCircle.ts" />
    /// <reference path="Shape.ts" />
    (function (Graphics) {
        var Circle = (function (_super) {
            __extends(Circle, _super);
            function Circle(x, y, radius, color) {
                        _super.call(this, new EndGate.Vector2d(x, y), color);
                this._type = "Circle";
                this.Radius = radius;
            }
            Circle.prototype.BuildPath = function (context) {
                context.arc(0, 0, this.Radius, 0, (Math).twoPI);
            };
            Circle.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingCircle(this.Position, this.Radius);
                bounds.Rotation = this.Rotation;
                return bounds;
            };
            return Circle;
        })(Graphics.Abstractions.Shape);
        Graphics.Circle = Circle;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Circle.js.map
