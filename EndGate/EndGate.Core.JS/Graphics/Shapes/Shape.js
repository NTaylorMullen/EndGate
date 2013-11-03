var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    /// <reference path="../../Assets/Vectors/Vector2d.ts" />
    /// <reference path="../Graphic2d.ts" />
    /// <reference path="../Color.ts" />
    (function (Graphics) {
        /**
        * Abstract drawable shape type that is used create customizable drawable graphics.
        */
        var Shape = (function (_super) {
            __extends(Shape, _super);
            function Shape(pixiBase, position, color) {
                var _this = this;
                _super.call(this, pixiBase, position);
                this._type = "Shape";

                this._graphicChangedWire = function () {
                    _this._BuildGraphic();
                };

                this.BorderColor = this._strokeColor = Graphics.Color.Black;
                this._borderThickness = 0;

                if (typeof color !== "undefined") {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    this.Color = this._fillColor = color;
                } else {
                    this.Color = this._fillColor = Graphics.Color.Black;
                }
            }
            Object.defineProperty(Shape.prototype, "Color", {
                get: /**
                * Gets or sets the current shape color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._fillColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    // Unbind old
                    this._fillColor.OnChange.Unbind(this._graphicChangedWire);
                    this._fillColor = color;

                    // Bind new
                    this._fillColor.OnChange.Bind(this._graphicChangedWire);

                    // Update state
                    this._graphicChangedWire();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderThickness", {
                get: /**
                * Gets or sets the current border thickness.
                */
                function () {
                    return this._borderThickness;
                },
                set: function (thickness) {
                    this._borderThickness = thickness;
                    this._graphicChangedWire();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Shape.prototype, "BorderColor", {
                get: /**
                * Gets or sets the current border color.  Valid colors are strings like "red" or "rgb(255,0,0)".
                */
                function () {
                    return this._strokeColor;
                },
                set: function (color) {
                    if (typeof color === "string") {
                        color = new Graphics.Color(color);
                    }

                    // Unbind old
                    this._strokeColor.OnChange.Unbind(this._graphicChangedWire);
                    this._strokeColor = color;

                    // Bind new
                    this._strokeColor.OnChange.Bind(this._graphicChangedWire);

                    // Update state
                    this._graphicChangedWire();
                },
                enumerable: true,
                configurable: true
            });

            Shape.prototype.Border = function (thickness, color) {
                this.BorderThickness = thickness;
                this.BorderColor = color;
            };

            // Should be called before any shape logic builds graphics
            Shape.prototype._StartBuildGraphic = function () {
                this.PixiBase.clear();

                if (this._borderThickness > 0) {
                    this.PixiBase.lineStyle(this._borderThickness, this._strokeColor.toHexValue(), this._strokeColor.A);
                }

                this.PixiBase.beginFill(this._fillColor.toHexValue(), this._fillColor.A);
            };

            // Should be overridden to control what's built;
            Shape.prototype._BuildGraphic = function () {
                this._StartBuildGraphic();

                // Overridden graphic code should go here
                this._EndBuildGraphic();
            };

            // Should be called before any shape logic builds graphics
            Shape.prototype._EndBuildGraphic = function () {
                this.PixiBase.endFill();
            };

            Shape.prototype.Dispose = function () {
                _super.prototype.Dispose.call(this);

                this._fillColor.OnChange.Unbind(this._graphicChangedWire);
                this._strokeColor.OnChange.Unbind(this._graphicChangedWire);
            };

            Shape.prototype._Clone = function (graphic) {
                graphic.Border(this.BorderThickness, this.BorderColor.Clone());

                _super.prototype._Clone.call(this, graphic);
            };
            return Shape;
        })(Graphics.Graphic2d);
        Graphics.Shape = Shape;
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
