var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EndGate;
(function (EndGate) {
    (function (Graphics) {
        var Line = (function (_super) {
            __extends(Line, _super);
            function Line(fromX, fromY, toX, toY, lineWidth, color) {
                if (typeof lineWidth === "undefined") { lineWidth = 1; }
                        _super.call(this, EndGate.Vector2d.Zero());
                this._type = "Line2d";
                this._from = new EndGate.Vector2d(fromX, fromY);
                this._to = new EndGate.Vector2d(toX, toY);
                this.LineWidth(lineWidth);
                this.UpdatePosition();
                if(typeof color !== "undefined") {
                    this.Color(color);
                }
            }
            Line.prototype.From = function (newPosition) {
                return this.GetOrSetLinePoint("from", newPosition);
            };
            Line.prototype.To = function (newPosition) {
                return this.GetOrSetLinePoint("to", newPosition);
            };
            Line.prototype.Color = function (color) {
                return this.State.StrokeStyle(color);
            };
            Line.prototype.LineWidth = function (width) {
                return this.State.LineWidth(width);
            };
            Line.prototype.LineCap = function (cap) {
                return this.State.LineCap(cap);
            };
            Line.prototype.Draw = function (context) {
                _super.prototype.StartDraw.call(this, context);
                if(!this._cachedPosition.Equivalent(this.Position)) {
                    this.RefreshCache();
                }
                context.beginPath();
                context.moveTo(this._from.X - this.Position.X, this._from.Y - this.Position.Y);
                context.lineTo(this._to.X - this.Position.X, this._to.Y - this.Position.Y);
                context.stroke();
                _super.prototype.EndDraw.call(this, context);
            };
            Line.prototype.GetDrawBounds = function () {
                var bounds = new EndGate.Bounds.BoundingRectangle(this.Position, new EndGate.Size2d(this._boundsWidth, this.LineWidth()));
                bounds.Rotation = Math.atan2(this._difference.Y, this._difference.X) + this.Rotation;
                return bounds;
            };
            Line.prototype.UpdatePosition = function () {
                this.Position = ((this._from.Add(this._to)).Divide(2));
                this._difference = this._to.Subtract(this._from);
                this._boundsWidth = this._from.Distance(this._to).Length();
                this._cachedPosition = this.Position.Clone();
            };
            Line.prototype.RefreshCache = function () {
                var difference = this.Position.Subtract(this._cachedPosition);
                this._from.X += difference.X;
                this._from.Y += difference.Y;
                this._to.X += difference.X;
                this._to.Y += difference.Y;
                this._cachedPosition = this.Position.Clone();
            };
            Line.prototype.GetOrSetLinePoint = function (name, newPosition) {
                if(typeof newPosition === "undefined") {
                    this["_" + name] = newPosition;
                    this.UpdatePosition();
                }
                return this["_" + name];
            };
            return Line;
        })(Graphics.Abstractions.Graphic2d);
        Graphics.Line = Line;        
    })(EndGate.Graphics || (EndGate.Graphics = {}));
    var Graphics = EndGate.Graphics;
})(EndGate || (EndGate = {}));
//@ sourceMappingURL=Line2d.js.map
