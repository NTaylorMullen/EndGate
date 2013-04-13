var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var Assets = EndGate.Core.Assets;
            var BoundingRectangle = (function (_super) {
                __extends(BoundingRectangle, _super);
                function BoundingRectangle(first, second) {
                    _super.call(this);
                    this._type = "BoundingRectangle";
                    if(typeof second !== "undefined") {
                        this.Size = new Assets.Size2d(first, second);
                    } else {
                        this.Size = first;
                    }
                }
                BoundingRectangle.prototype.Vertices = function () {
                    return [
                        this.TopLeft(), 
                        this.TopRight(), 
                        this.BotLeft(), 
                        this.BotRight()
                    ];
                };
                BoundingRectangle.prototype.TopLeft = function () {
                    var v = new Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                    if(this.Rotation == 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.TopRight = function () {
                    var v = new Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                    if(this.Rotation == 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.BotLeft = function () {
                    var v = new Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                    if(this.Rotation == 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.BotRight = function () {
                    var v = new Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                    if(this.Rotation == 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                    return circle.IntersectsRectangle(this);
                };
                return BoundingRectangle;
            })(Bounds2d);
            BoundingObject.BoundingRectangle = BoundingRectangle;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
