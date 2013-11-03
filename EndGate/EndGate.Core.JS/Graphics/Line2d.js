var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../Assets/Sizes/Size2d.ts" />
    /// <reference path="../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Bounds/BoundingRectangle.ts" />
    /// <reference path="Graphic2d.ts" />
    /// <reference path="Color.ts" />
    (function (Graphics) {
        /**
        * Defines a drawable 2d line element.
        */
        var Line2d = (function (_super) {
            __extends(Line2d, _super);
            function Line2d(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                var _this = this;
                _super.call(this, new PIXI.Graphics(), EndGate.Vector2d.Zero);
                this._type = "Line2d";

                // Save the built graphic and set it to a noop so it's not re-built tons of times during construction.
                var savedBuildGraphic = this._BuildGraphic;
                this._BuildGraphic = function () {
                };

                // Set a dummy vector2d so that when setting the property it clears an invalid object
                this._to = this._from = EndGate.Vector2d.Zero;

                this.From = new EndGate.Vector2d(fromX, fromY);
                this.To = new EndGate.Vector2d(toX, toY);
                this.UpdatePosition();

                this.LineWidth = lineWidth;

                this._colorChangeWire = function (color) {
                    _this._lineColor = color;
                    _this._BuildGraphic();
                };

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }
                    this.Color = this._lineColor = color;
                } else {
                    this.Color = this._lineColor = Graphics.Color.Black;
                }

                // Set the BuildGraphic function to its appropriate values now that all data points have been constructed.
                this._BuildGraphic = savedBuildGraphic;

                this._BuildGraphic();
            }
            Object.defineProperty(Line2d.prototype, "From", {
                get: /**
                * Gets or sets the From location of the Line2d.
                */
                function () {
                    return this._from;
                },
                set: function (from) {
                    var _this = this;
                    var previousX = this._from.X, previousY = this._from.Y;

                    // Delete the old position to remove any property bindings on the vector2d
                    delete this._from.X;
                    delete this._from.Y;

                    // Reset the position to its previous values (the monitor should not be applying now)
                    this._from.X = previousX;
                    this._from.Y = previousY;

                    this._from = from;

                    // If our Position changes we need to update the underlying PIXI object to match
                    this._MonitorProperty(from, "X", function () {
                        return from.X;
                    }, function (newX) {
                        from.X = newX;
                        _this.UpdatePosition();
                    });

                    this._MonitorProperty(from, "Y", function () {
                        return from.Y;
                    }, function (newY) {
                        from.Y = newY;
                        _this.UpdatePosition();
                    });

                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "To", {
                get: /**
                * Gets or sets the To location of the Line2d.
                */
                function () {
                    return this._to;
                },
                set: function (to) {
                    var _this = this;
                    var previousX = this._to.X, previousY = this._to.Y;

                    // Delete the old position to remove any property bindings on the vector2d
                    delete this._to.X;
                    delete this._to.Y;

                    // Reset the position to its previous values (the monitor should not be applying now)
                    this._to.X = previousX;
                    this._to.Y = previousY;

                    this._to = to;

                    // If our Position changes we need to update the underlying PIXI object to match
                    this._MonitorProperty(to, "X", function () {
                        return to.X;
                    }, function (newX) {
                        to.X = newX;
                        _this.UpdatePosition();
                    });

                    this._MonitorProperty(to, "Y", function () {
                        return to.Y;
                    }, function (newY) {
                        to.Y = newY;
                        _this.UpdatePosition();
                    });

                    this.UpdatePosition();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Position", {
                get: /**
                * Gets or sets the Position of the Line2d.  The Position determines where the graphic will be drawn on the screen.
                */
                function () {
                    return this._position;
                },
                set: function (position) {
                    var _this = this;
                    var previousX = this._position.X, previousY = this._position.Y;

                    // Delete the old position to remove any property bindings on the vector2d
                    delete this._position.X;
                    delete this._position.Y;

                    // Reset the position to its previous values (the monitor should not be applying now)
                    this._position.X = previousX;
                    this._position.Y = previousY;

                    this._position = position;

                    // If our Position changes we need to update the underlying PIXI object to match
                    this._MonitorProperty(position, "X", function () {
                        return position.X;
                    }, function (newX) {
                        position.X = newX;
                        _this.RefreshCache();
                    });

                    this._MonitorProperty(position, "Y", function () {
                        return position.Y;
                    }, function (newY) {
                        position.Y = newY;
                        _this.RefreshCache();
                    });

                    this.RefreshCache();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "Color", {
                get: /**
                * Gets or sets the line color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._lineColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    // Unbind old
                    this._lineColor.OnChange.Unbind(this._colorChangeWire);
                    this._lineColor = color;

                    // Bind new
                    this._lineColor.OnChange.Bind(this._colorChangeWire);

                    // Update state
                    this._colorChangeWire(color);
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Line2d.prototype, "LineWidth", {
                get: /**
                * Gets or sets the line width.
                */
                function () {
                    return this._lineWidth;
                },
                set: function (width) {
                    this._lineWidth = width;
                    this._BuildGraphic();
                },
                enumerable: true,
                configurable: true
            });

            Line2d.prototype._BuildGraphic = function () {
                this.PixiBase.clear();

                if (this._lineWidth > 0) {
                    this.PixiBase.lineStyle(this._lineWidth, this._lineColor.toHexValue(), this._lineColor.A);
                    this.PixiBase.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                    this.PixiBase.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                }
            };

            /**
            * The bounding area that represents where the Line2d will draw.
            */
            Line2d.prototype.GetDrawBounds = function () {
                var boundsWidth = this._from.Distance(this._to).Length(), bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(boundsWidth, this._lineWidth)), difference = this._to.Subtract(this._from);

                bounds.Rotation = Math.atan2(difference.Y, difference.X) + this.Rotation;

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

                _super.prototype._Clone.call(this, graphic);

                return graphic;
            };

            Line2d.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);

                // We don't need any of our helper functions anymore so make them noop.
                this._BuildGraphic = this.UpdatePosition = this.RefreshCache = function () {
                };

                // Set the position to be a new Vector2d so it unbinds all monitors to the existing position object
                this.Position = this.From = this.To = eg.Vector2d.Zero;

                this._lineColor.OnChange.Unbind(this._colorChangeWire);

                // Null out all objects so they can be garbage collected faster.
                this._position = this._to = this._from = this._cachedPosition = this._lineColor = this._lineWidth = this._colorChangeWire = null;
            };

            Line2d.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
                this._BuildGraphic();
            };

            Line2d.prototype.RefreshCache = function () {
                var difference = this.Position.Subtract(this._cachedPosition);
                if (!difference.IsZero()) {
                    this._from.X += difference.X;
                    this._from.Y += difference.Y;
                    this._to.X += difference.X;
                    this._to.Y += difference.Y;
                    this._cachedPosition = this.Position.Clone();
                    this._BuildGraphic();
                }
            };
            return Line2d;
        })(Graphics.Graphic2d);
        Graphics.Line2d = Line2d;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
