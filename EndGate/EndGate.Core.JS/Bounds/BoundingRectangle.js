/// <reference path="../Assets/Vectors/Helpers/Vector2dHelpers.ts" />
/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="BoundingCircle.ts" />
/// <reference path="Bounds2d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
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
            /**
            * Scales the width and height of the BoundingRectangle.
            * @param x Value to multiply the width by.
            * @param y Value to multiply the height by.
            */
            BoundingRectangle.prototype.Scale = function (x, y) {
                this.Size.Width *= x;
                this.Size.Height *= y;
            };

            Object.defineProperty(BoundingRectangle.prototype, "TopLeft", {
                /**
                * Gets the top left corner of the BoundingRectangle.
                */
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "TopRight", {
                /**
                * Gets the top right corner of the BoundingRectangle.
                */
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y - this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotLeft", {
                /**
                * Gets the bottom left corner of the BoundingRectangle.
                */
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X - this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(BoundingRectangle.prototype, "BotRight", {
                /**
                * Gets the bottom right corner of the BoundingRectangle.
                */
                get: function () {
                    if (this.Rotation === 0) {
                        return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight);
                    }

                    return new EndGate.Vector2d(this.Position.X + this.Size.HalfWidth, this.Position.Y + this.Size.HalfHeight).RotateAround(this.Position, this.Rotation);
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Returns a list of vertices that are the locations of each corner of the BoundingRectangle. Format: [TopLeft, TopRight, BotLeft, BotRight].
            */
            BoundingRectangle.prototype.Corners = function () {
                return [this.TopLeft, this.TopRight, this.BotLeft, this.BotRight];
            };

            /**
            * Determines if the current BoundingRectangle is intersecting the provided BoundingCircle.
            * @param circle BoundingCircle to check intersection with.
            */
            BoundingRectangle.prototype.IntersectsCircle = function (circle) {
                return circle.IntersectsRectangle(this);
            };

            /**
            * Determines if the current BoundingRectangle is intersecting the provided BoundingRectangle.
            * @param rectangle BoundingRectangle to check intersection with.
            */
            BoundingRectangle.prototype.IntersectsRectangle = function (rectangle) {
                if (this.Rotation === 0 && rectangle.Rotation === 0) {
                    var myTopLeft = this.TopLeft, myBotRight = this.BotRight, theirTopLeft = rectangle.TopLeft, theirBotRight = rectangle.BotRight;

                    return theirTopLeft.X <= myBotRight.X && theirBotRight.X >= myTopLeft.X && theirTopLeft.Y <= myBotRight.Y && theirBotRight.Y >= myTopLeft.Y;
                } else if (rectangle.Position.Distance(this.Position).Magnitude() <= rectangle.Size.Radius + this.Size.Radius) {
                    var axisList = [this.TopRight.Subtract(this.TopLeft), this.TopRight.Subtract(this.BotRight), rectangle.TopLeft.Subtract(rectangle.BotLeft), rectangle.TopLeft.Subtract(rectangle.TopRight)];
                    var myVertices = this.Corners();
                    var theirVertices = rectangle.Corners();

                    for (var i = 0; i < axisList.length; i++) {
                        var axi = axisList[i];
                        var myProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, myVertices);
                        var theirProjections = EndGate._.Vector2dHelpers.GetMinMaxProjections(axi, theirVertices);

                        // No collision
                        if (theirProjections.Max < myProjections.Min || myProjections.Max < theirProjections.Min) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            };

            /**
            * Determines if the current BoundingRectangle contains the provided Vector2d.
            * @param point A point.
            */
            BoundingRectangle.prototype.ContainsPoint = function (point) {
                var savedRotation = this.Rotation;

                if (this.Rotation !== 0) {
                    this.Rotation = 0;
                    point = point.RotateAround(this.Position, -savedRotation);
                }

                var myTopLeft = this.TopLeft, myBotRight = this.BotRight;

                this.Rotation = savedRotation;

                return point.X <= myBotRight.X && point.X >= myTopLeft.X && point.Y <= myBotRight.Y && point.Y >= myTopLeft.Y;
            };

            /**
            * Determines if the current BoundingRectangle completely contains the provided BoundingCircle.
            * @param circle A circle to check containment on.
            */
            BoundingRectangle.prototype.ContainsCircle = function (circle) {
                return this.ContainsPoint(new EndGate.Vector2d(circle.Position.X - circle.Radius, circle.Position.Y)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X, circle.Position.Y - circle.Radius)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X + circle.Radius, circle.Position.Y)) && this.ContainsPoint(new EndGate.Vector2d(circle.Position.X, circle.Position.Y + circle.Radius));
            };

            /**
            * Determines if the current BoundingCircle completely contains the provided BoundingRectangle.
            * @param rectangle A rectangle to check containment on.
            */
            BoundingRectangle.prototype.ContainsRectangle = function (rectangle) {
                var corners = rectangle.Corners();

                for (var i = 0; i < corners.length; i++) {
                    if (!this.ContainsPoint(corners[i])) {
                        return false;
                    }
                }

                return true;
            };
            return BoundingRectangle;
        })(EndGate.Bounds.Bounds2d);
        Bounds.BoundingRectangle = BoundingRectangle;
    })(EndGate.Bounds || (EndGate.Bounds = {}));
    var Bounds = EndGate.Bounds;
})(EndGate || (EndGate = {}));
