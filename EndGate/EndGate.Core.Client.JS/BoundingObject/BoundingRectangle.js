var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Core) {
        (function (BoundingObject) {
            var BoundingRectangle = (function (_super) {
                __extends(BoundingRectangle, _super);
                function BoundingRectangle(position, size) {
                                _super.call(this, position);
                    this._type = "BoundingRectangle";
                    this.Size = size;
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
                    var v = new Core.Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.TopRight = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.BotLeft = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.BotRight = function () {
                    var v = new Core.Assets.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                    if(this.Rotation === 0) {
                        return v;
                    }
                    return v.RotateAround(this.Position, this.Rotation);
                };
                BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                    return circle.IntersectsRectangle(this);
                };
                BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                    if(this.Rotation === 0 && rectangle.Rotation === 0) {
                        var myTopLeft = this.TopLeft(), myBotRight = this.BotRight(), theirTopLeft = rectangle.TopLeft(), theirBotRight = rectangle.BotRight();
                        return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                    } else if(rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {
                        var axisList = [
                            this.TopRight().Subtract(this.TopLeft()), 
                            this.TopRight().Subtract(this.BotRight()), 
                            rectangle.TopLeft().Subtract(rectangle.BotLeft()), 
                            rectangle.TopLeft().Subtract(rectangle.TopRight())
                        ];
                        var myVertices = this.Vertices();
                        var theirVertices = rectangle.Vertices();
                        for(var i = 0; i < axisList.length; i++) {
                            var axi = axisList[i];
                            var myProjections = Core.Assets.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                            var theirProjections = Core.Assets.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);
                            if(theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                                return false;
                            }
                        }
                        return true;
                    }
                    return false;
                };
                BoundingRectangle.prototype.ContainsPoint = function (point) {
                    var savedRotation = this.Rotation;
                    if(this.Rotation !== 0) {
                        this.Rotation = 0;
                        point = point.RotateAround(this.Position, -savedRotation);
                    }
                    var myTopLeft = this.TopLeft(), myBotRight = this.BotRight();
                    this.Rotation = savedRotation;
                    return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
                };
                return BoundingRectangle;
            })(BoundingObject.Bounds2d);
            BoundingObject.BoundingRectangle = BoundingRectangle;            
        })(Core.BoundingObject || (Core.BoundingObject = {}));
        var BoundingObject = Core.BoundingObject;
    })(EndGate.Core || (EndGate.Core = {}));
    var Core = EndGate.Core;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=BoundingRectangle.js.map
