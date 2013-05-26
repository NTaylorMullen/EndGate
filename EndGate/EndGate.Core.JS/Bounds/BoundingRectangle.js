var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Vectors/Helpers/Vector2dHelpers.ts" />
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="BoundingCircle.ts" />
    /// <reference path="Bounds2d.ts" />
    (function (Bounds) {
        /**
        * Defines a rectangle that can be used to detect intersections.
        */
        var BoundingRectangle = (function (_super) {
            __extends(BoundingRectangle, _super);
            /**
            * Creates a new instance of BoundingRectangle.
            * @param position Initial Position of the BoundingRectangle.
            * @param size Initial Size of the BoundingRectangle.
            */
            function BoundingRectangle(position, size) {
                        _super.call(this, position);
                this._type = "BoundingRectangle";
                this._boundsType = "BoundingRectangle";
                this.Size = size;
            }
            BoundingRectangle.prototype.Scale = /**
            * Scales the width and height of the BoundingRectangle.
            * @param x Value to multiply the width by.
            * @param y Value to multiply the height by.
            */
            function (x, y) {
                this.Size.Width *= x;
                this.Size.Height *= y;
            };
            BoundingRectangle.prototype.Vertices = /**
            * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
            */
            function () {
                return [
                    this.TopLeft(), 
                    this.TopRight(), 
                    this.BotLeft(), 
                    this.BotRight()
                ];
            };
            BoundingRectangle.prototype.TopLeft = /**
            * Calculates the top left corner of the BoundingRectangle.
            */
            function () {
                var v = new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.TopRight = /**
            * Calculates the top right corner of the BoundingRectangle.
            */
            function () {
                var v = new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y - this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.BotLeft = /**
            * Calculates the bottom left corner of the BoundingRectangle.
            */
            function () {
                var v = new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.BotRight = /**
            * Calculates the bottom right corner of the BoundingRectangle.
            */
            function () {
                var v = new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth(), this.Position.Y + this.Size.HalfHeight());
                if(this.Rotation === 0) {
                    return v;
                }
                return v.RotateAround(this.Position, this.Rotation);
            };
            BoundingRectangle.prototype.IntersectsCircle = /**
            * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            function (circle) {
                return circle.IntersectsRectangle(this);
            };
            BoundingRectangle.prototype.IntersectsRectangle = /**
            * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            function (rectangle) {
                if(this.Rotation === 0 && rectangle.Rotation === 0) {
                    var myTopLeft = this.TopLeft(), myBotRight = this.BotRight(), theirTopLeft = rectangle.TopLeft(), theirBotRight = rectangle.BotRight();
                    return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                } else if(rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius() + this.Size.Radius()) {
                    // Check if we're somewhat close to the rectangle ect that we might be colliding with
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
                        var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                        var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);
                        // No collision
                        if(theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            };
            BoundingRectangle.prototype.ContainsPoint = /**
            * Determines if the current BoundingRectangle contains the provided Vector2d.
            * @param point A point.
            */
            function (point) {
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
        })(Bounds.Abstractions.Bounds2d);
        Bounds.BoundingRectangle = BoundingRectangle;        
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
