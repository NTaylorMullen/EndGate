/// <reference path="../Assets/Sizes/Size2d.ts" />
/// <reference path="../Assets/Vectors/Vector2d.ts" />
/// <reference path="../Bounds/BoundingRectangle.ts" />
/// <reference path="Graphic2d.ts" />
/// <reference path="Color.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        /**
        * Defines a drawable 2d line element.
        */
        var Line2d = (function (_super) {
            __extends(Line2d, _super);
            function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                var _this = this;
                _super.call(this, EndGate.Vector2d.Zero); // Set to zero here then updated in the rest of the constructor (use same logic)
                this._type = "Line2d";

                this._from = new EndGate.Vector2d(fromX, fromY);
                this._to = new EndGate.Vector2d(toX, toY);
                this.LineWidth = lineWidth;
                this.UpdatePosition();

                this._strokeChangeWire = function (color) {
                    _this._State.StrokeStyle = color.toString();
                };

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new EndGate.Graphics.Color(color);
                    }
                    this.Color = this._strokeStyle = color;
                } else {
                    this.Color = this._strokeStyle = EndGate.Graphics.Color.Black;
                }
            }
            Object.defineProperty(Line2d.prototype, "From", {
                /**
                * Gets or sets the From location of the Line2d.
                */
                get: function () {
                    return this._from;
                },
                set: function (newPosition) {
                    this._from = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "To", {
                /**
                * Gets or sets the To location of the Line2d.
                */
                get: function () {
                    return this._to;
                },
                set: function (newPosition) {
                    this._to = newPosition;
                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Color", {
                /**
                * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                get: function () {
                    return this._strokeStyle;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new EndGate.Graphics.Color(color);
                    }

                    // Unbind old
                    this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
                    this._strokeStyle = color;

                    // Bind new
                    this._strokeStyle.OnChange.Bind(this._strokeChangeWire);

                    // Update state
                    this._strokeChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineWidth", {
                /**
                * Gets or sets the line width.
                */
                get: function () {
                    return this._State.LineWidth;
                },
                set: function (width) {
                    this._State.LineWidth = width;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineCap", {
                /**
                * Gets or sets the line cap.  Values can be "butt", "round", "square".
                */
                get: function () {
                    return this._State.LineCap;
                },
                set: function (cap) {
                    this._State.LineCap = cap;
                },
                enumerable: true,
                configurable: true
            });

            /**
            * Draws the line onto the given context.  If this Line2d is part of a scene the Draw function will be called automatically.
            * @param context The canvas context to draw the line onto.
            */
            Line2d.prototype.Draw = function (context) {
                // Need to check to ensure that the colors still match up so if people are performing direct color manipulation
                // such as color.R = 131.
                if (this._strokeStyle.toString() !== this._State.StrokeStyle) {
                    this._State.StrokeStyle = this._strokeStyle.toString();
                }

                _super.prototype._StartDraw.call(this, context);

                // Check if the user has modified the position directly, if so we need to translate the from and to positions accordingly
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
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(this._boundsWidth, this.LineWidth));

                bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;

                return bounds;
            };

            /**
            * Scale's the Line2d graphic.
            * @param scale The value to multiply the graphic's size by.
            */
            Line2d.prototype.Scale = function (scale) {
                this.From = this.Position.Add(this.From.Subtract(this.Position).Multiply(scale));
                this.To = this.Position.Add(this.To.Subtract(this.Position).Multiply(scale));
            };

            /**
            * Returns a nearly identical copy of this Line2d.  If this Line2d belongs to a parent, the cloned Line2d will not. If this Line2d has children, all children will be cloned as well.  Lastly, the cloned Line2d will not have the same event bindings as this one does.
            */
            Line2d.prototype.Clone = function () {
                var graphic = new Line2d(this.From.X, this.From.Y, this.To.X, this.To.Y, this.LineWidth, this.Color.Clone());

                graphic.LineCap = this.LineCap;

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Line2d.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);

                this._strokeStyle.OnChange.Unbind(this._strokeChangeWire);
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
            return Line2d;
        })(EndGate.Graphics.Graphic2d);
        Graphics.Line2d = Line2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
