var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var eg;
(function (eg) {
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Bounds/BoundingRectangle.ts" />
    /// <reference path="Graphic2d.ts" />
    (function (Graphics) {
        var Line2d = (function (_super) {
            __extends(Line2d, _super);
            function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                _super.call(this, eg.Vector2d.Zero());
                this._type = "Line2d";

                this._from = new eg.Vector2d(fromX, fromY);
                this._to = new eg.Vector2d(toX, toY);
                this.LineWidth(lineWidth);
                this.UpdatePosition();

                if (typeof color !== "undefined") {
                    this.Color(color);
                }
            }
            Line2d.prototype.From = function (newPosition) {
                return this.GetOrSetLinePoint("from", newPosition);
            };

            Line2d.prototype.To = function (newPosition) {
                return this.GetOrSetLinePoint("to", newPosition);
            };

            Line2d.prototype.Color = function (color) {
                return this._State.StrokeStyle(color);
            };

            Line2d.prototype.LineWidth = function (width) {
                return this._State.LineWidth(width);
            };

            Line2d.prototype.LineCap = function (cap) {
                return this._State.LineCap(cap);
            };

            /**
            * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the line onto.
            */
            Line2d.prototype.Draw = function (context) {
                _super.prototype._StartDraw.call(this, context);

                if (!this._cachedPosition.Equivalent(this.Position)) {
                    this.RefreshCache();
                }

                // Context origin is at the center point of the line
                context.beginPath();
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();

                _super.prototype._EndDraw.call(this, context);
            };

            /**
            * The bounding area that represents where the Line2d will draw.
            */
            Line2d.prototype.GetDrawBounds = function () {
                var bounds = new eg.Bounds.BoundingRectangle(this.Position, new eg.Size2d(this._boundsWidth, this.LineWidth()));

                bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

                return bounds;
            };

            Line2d.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
                this._difference = this._to.Subtract(this._from);
                this._boundsWidth = this._from.Distance(this._to).Length();
                this._cachedPosition = this.Position.Clone();
            };

            Line2d.prototype.RefreshCache = function () {
                var difference = this.Position.Subtract(this._cachedPosition);
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
                this._cachedPosition = this.Position.Clone();
            };

            Line2d.prototype.GetOrSetLinePoint = function (name, newPosition) {
                if (typeof newPosition === "undefined") {
                    this["_" + name] = newPosition;
                    this.UpdatePosition();
                }

                return this["_" + name];
            };
            return Line2d;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Line2d = Line2d;
    })(eg.Graphics || (eg.Graphics = {}));
    var Graphics = eg.Graphics;
})(eg || (eg = {}));
