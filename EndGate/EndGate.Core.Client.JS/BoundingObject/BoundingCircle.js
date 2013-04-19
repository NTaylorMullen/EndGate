var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var BoundingCircle = (function (_super) {
                __extends(BoundingCircle, _super);
                function BoundingCircle(position, radius) {
                                _super.call(this, position);
                    this._type = "BoundingCircle";
                    this._boundsType = "BoundingCircle";
                    this.Radius = radius;
                }
                BoundingCircle.prototype.Area = function () {
                    return Math.PI * this.Radius * this.Radius;
                };
                BoundingCircle.prototype.Circumfrence = function () {
                    return 2 * Math.PI * this.Radius;
                };
                BoundingCircle.prototype.IntersectsCircle = function (circle) {
                    return this.Position.Distance(circle.Position).Length() < this.Radius + circle.Radius;
                };
                BoundingCircle.prototype.IntersectsRectangle = function (rectangle) {
                    var translated = (rectangle.Rotation === 0) ? this.Position : this.Position.RotateAround(rectangle.Position, rectangle.Rotation);
                    var circleDistance = translated.Distance(rectangle.Position);
                    if(circleDistance.X > (rectangle.Size.HalfWidth() + this.Radius)) {
                        return false;
                    }
                    if(circleDistance.Y > (rectangle.Size.HalfHeight() + this.Radius)) {
                        return false;
                    }
                    if(circleDistance.X <= (rectangle.Size.HalfWidth())) {
                        return true;
                    }
                    if(circleDistance.Y <= (rectangle.Size.HalfHeight())) {
                        return true;
                    }
                    var cornerDistance_sq = Math.pow(circleDistance.X - rectangle.Size.HalfWidth(), 2) + Math.pow(circleDistance.Y - rectangle.Size.HalfHeight(), 2);
                    return (cornerDistance_sq <= (this.Radius * this.Radius));
                };
                BoundingCircle.prototype.ContainsPoint = function (point) {
                    return this.Position.Distance(point).Magnitude() < this.Radius;
                };
                return BoundingCircle;
            })(BoundingObject.Bounds2d);
            BoundingObject.BoundingCircle = BoundingCircle;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=BoundingCircle.js.map
